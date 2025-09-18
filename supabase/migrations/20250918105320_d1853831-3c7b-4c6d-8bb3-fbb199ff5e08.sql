-- CRITICAL SECURITY FIXES - Phase 1: Data Protection

-- 1. Enable RLS on users table and create proper policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id);

-- Suppliers can be viewed by others for business purposes (when they are suppliers)
CREATE POLICY "Approved suppliers are publicly viewable" 
ON public.users 
FOR SELECT 
USING (
  user_type = 'supplier' AND 
  EXISTS (
    SELECT 1 FROM public.suppliers 
    WHERE suppliers.id = users.id 
    AND suppliers.status = 'approved'
  )
);

-- 2. Fix search_queries table policies - remove overly permissive policies
DROP POLICY IF EXISTS "Anyone can insert search queries" ON public.search_queries;
DROP POLICY IF EXISTS "Users can view their own search queries" ON public.search_queries;

-- Create more restrictive policies for search_queries
CREATE POLICY "Authenticated users can insert search queries" 
ON public.search_queries 
FOR INSERT 
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR 
  (auth.uid() IS NULL AND user_id IS NULL)
);

CREATE POLICY "Users can only view their own search queries" 
ON public.search_queries 
FOR SELECT 
USING (user_id = auth.uid());

-- 3. Fix unavailable_products table - restrict business intelligence access
DROP POLICY IF EXISTS "Everyone can view unavailable products" ON public.unavailable_products;

-- Only allow suppliers and requesting users to view unavailable products
CREATE POLICY "Suppliers and requesting users can view unavailable products" 
ON public.unavailable_products 
FOR SELECT 
USING (
  -- User who requested it
  requested_by = auth.uid() OR 
  -- Suppliers can see products to potentially fulfill requests
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.user_type = 'supplier'
  )
);

-- 4. Fix database function security - add proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.increment_unavailable_product_request(product_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.unavailable_products 
  SET request_count = request_count + 1,
      updated_at = now()
  WHERE id = product_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- 5. Remove problematic security headers component
-- This will be handled in the code changes to fix X-Frame-Options DENY issue
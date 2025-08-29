-- Create search queries table to track user searches
CREATE TABLE IF NOT EXISTS public.search_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  query_text TEXT NOT NULL,
  category_id UUID,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

-- Enable RLS on search_queries
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;

-- Create policies for search_queries
CREATE POLICY "Users can view their own search queries" 
ON public.search_queries 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert search queries" 
ON public.search_queries 
FOR INSERT 
WITH CHECK (true);

-- Create unavailable products table for products not currently on the platform
CREATE TABLE IF NOT EXISTS public.unavailable_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  description TEXT,
  category_id UUID,
  subcategory_id UUID,
  requested_by UUID,
  request_count INTEGER DEFAULT 1,
  supplier_contacted BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Enable RLS on unavailable_products
ALTER TABLE public.unavailable_products ENABLE ROW LEVEL SECURITY;

-- Create policies for unavailable_products
CREATE POLICY "Everyone can view unavailable products" 
ON public.unavailable_products 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can request unavailable products" 
ON public.unavailable_products 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Suppliers can update unavailable products" 
ON public.unavailable_products 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.user_type = 'supplier'
));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_search_queries_user_id ON public.search_queries(user_id);
CREATE INDEX IF NOT EXISTS idx_search_queries_created_at ON public.search_queries(created_at);
CREATE INDEX IF NOT EXISTS idx_search_queries_query_text ON public.search_queries USING gin(to_tsvector('arabic', query_text));

CREATE INDEX IF NOT EXISTS idx_unavailable_products_category ON public.unavailable_products(category_id);
CREATE INDEX IF NOT EXISTS idx_unavailable_products_status ON public.unavailable_products(status);
CREATE INDEX IF NOT EXISTS idx_unavailable_products_created_at ON public.unavailable_products(created_at);

-- Create trigger for updating updated_at column
DROP TRIGGER IF EXISTS update_unavailable_products_updated_at ON public.unavailable_products;
CREATE TRIGGER update_unavailable_products_updated_at
BEFORE UPDATE ON public.unavailable_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to increment request count for unavailable products
CREATE OR REPLACE FUNCTION public.increment_unavailable_product_request(product_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.unavailable_products 
  SET request_count = request_count + 1,
      updated_at = now()
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
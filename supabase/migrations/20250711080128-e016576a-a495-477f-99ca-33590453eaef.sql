-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_type AS ENUM ('buyer', 'supplier', 'admin');
CREATE TYPE supplier_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE rfq_status AS ENUM ('pending', 'quoted', 'accepted', 'rejected');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');
CREATE TYPE notification_type AS ENUM ('rfq', 'order', 'message', 'system');

-- Create users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  user_type user_type DEFAULT 'buyer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  license_number TEXT,
  website TEXT,
  business_type TEXT,
  logo_url TEXT,
  description TEXT,
  status supplier_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subcategories table
CREATE TABLE public.subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id),
  subcategory_id UUID REFERENCES public.subcategories(id),
  name TEXT NOT NULL,
  description TEXT,
  images TEXT[], -- Array of image URLs
  videos TEXT[], -- Array of video URLs
  price DECIMAL(10,2),
  min_order_qty INTEGER DEFAULT 1,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RFQs (Request for Quotation) table
CREATE TABLE public.rfqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  details TEXT,
  status rfq_status DEFAULT 'pending',
  quoted_price DECIMAL(10,2),
  quoted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rfq_id UUID REFERENCES public.rfqs(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  rfq_id UUID REFERENCES public.rfqs(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status order_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create shipping_details table
CREATE TABLE public.shipping_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  zip_code TEXT,
  tracking_number TEXT,
  estimated_delivery DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  seen BOOLEAN DEFAULT false,
  related_id UUID, -- Can reference RFQ, order, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('product-images', 'product-images', true),
  ('product-videos', 'product-videos', true),
  ('supplier-logos', 'supplier-logos', true),
  ('user-avatars', 'user-avatars', true);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for suppliers table
CREATE POLICY "Suppliers can view their own profile" ON public.suppliers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Everyone can view approved suppliers" ON public.suppliers
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Suppliers can update their own profile" ON public.suppliers
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Suppliers can insert their own profile" ON public.suppliers
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for categories and subcategories (public read)
CREATE POLICY "Everyone can view categories" ON public.categories FOR SELECT TO public USING (true);
CREATE POLICY "Everyone can view subcategories" ON public.subcategories FOR SELECT TO public USING (true);

-- RLS Policies for products
CREATE POLICY "Everyone can view active products" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Suppliers can manage their own products" ON public.products
  FOR ALL USING (supplier_id = auth.uid());

-- RLS Policies for RFQs
CREATE POLICY "Users can view their own RFQs" ON public.rfqs
  FOR SELECT USING (buyer_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.products WHERE id = product_id AND supplier_id = auth.uid()));

CREATE POLICY "Buyers can create RFQs" ON public.rfqs
  FOR INSERT WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Suppliers can update RFQs for their products" ON public.rfqs
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.products WHERE id = product_id AND supplier_id = auth.uid()));

-- RLS Policies for messages
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their received messages" ON public.messages
  FOR UPDATE USING (receiver_id = auth.uid());

-- RLS Policies for orders
CREATE POLICY "Users can view their orders" ON public.orders
  FOR SELECT USING (buyer_id = auth.uid() OR supplier_id = auth.uid());

CREATE POLICY "Buyers can create orders" ON public.orders
  FOR INSERT WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Suppliers can update their orders" ON public.orders
  FOR UPDATE USING (supplier_id = auth.uid());

-- RLS Policies for shipping details
CREATE POLICY "Users can view shipping for their orders" ON public.shipping_details
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_id AND (buyer_id = auth.uid() OR supplier_id = auth.uid())
  ));

-- RLS Policies for favorites
CREATE POLICY "Users can manage their favorites" ON public.favorites
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for notifications
CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Storage policies for product images
CREATE POLICY "Anyone can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Storage policies for product videos
CREATE POLICY "Anyone can view product videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-videos');

CREATE POLICY "Authenticated users can upload product videos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-videos' AND auth.role() = 'authenticated');

-- Storage policies for supplier logos
CREATE POLICY "Anyone can view supplier logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'supplier-logos');

CREATE POLICY "Authenticated users can upload supplier logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'supplier-logos' AND auth.role() = 'authenticated');

-- Storage policies for user avatars
CREATE POLICY "Anyone can view user avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'user-avatars');

CREATE POLICY "Users can upload their own avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'user-avatars' AND auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rfqs_updated_at BEFORE UPDATE ON public.rfqs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'buyer')::user_type
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some default categories
INSERT INTO public.categories (name_ar, name_en, icon) VALUES
  ('مواد البناء', 'Building Materials', 'building'),
  ('الآلات والمعدات', 'Machinery & Equipment', 'cog'),
  ('المواد الخام البلاستيكية', 'Plastic Raw Materials', 'package'),
  ('السلع الاستهلاكية', 'Consumer Goods', 'shopping-cart'),
  ('مستلزمات التعبئة والتغليف', 'Packaging Supplies', 'box');

-- Drop existing objects if they exist
DROP POLICY IF EXISTS "Allow public select access on donations" ON public.donations;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own donations" ON public.donations;
DROP POLICY IF EXISTS "Allow users to update their own donations" ON public.donations;
DROP POLICY IF EXISTS "Allow public uploads to donations bucket" ON storage.objects;

DROP TABLE IF EXISTS public.donations;

-- Create the donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donation_type TEXT NOT NULL CHECK (donation_type IN ('book', 'pdf')),
    status TEXT DEFAULT 'pending' NOT NULL,
    donated_books JSONB,
    pickup_address TEXT,
    pickup_city TEXT,
    pickup_state TEXT,
    pickup_pincode TEXT,
    pickup_phone TEXT,
    file_name TEXT,
    file_url TEXT,
    pdf_title TEXT,
    pdf_author TEXT
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- POLICIES for donations table
-- 1. Allow public read access
CREATE POLICY "Allow public select access on donations"
ON public.donations FOR SELECT
USING (true);

-- 2. Allow authenticated users to insert their own donations
CREATE POLICY "Allow authenticated users to insert their own donations"
ON public.donations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow anonymous users to insert donations too
CREATE POLICY "Allow anonymous users to insert donations"
ON public.donations FOR INSERT
TO anon
WITH CHECK (true);


-- 3. Allow users to update their own donations
CREATE POLICY "Allow users to update their own donations"
ON public.donations FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Storage bucket setup
-- Ensure the bucket exists. If it does, this command does nothing.
INSERT INTO storage.buckets (id, name, public)
VALUES ('donations', 'donations', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public uploads to 'donations' bucket
CREATE POLICY "Allow public uploads to donations bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK ( bucket_id = 'donations' );

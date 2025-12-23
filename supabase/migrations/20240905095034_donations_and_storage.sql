-- Create the donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donation_type TEXT NOT NULL CHECK (donation_type IN ('book', 'pdf')),
    status TEXT NOT NULL DEFAULT 'pending',

    -- Fields for book donations
    donated_books JSONB,
    pickup_address TEXT,
    pickup_city TEXT,
    pickup_state TEXT,
    pickup_pincode TEXT,
    pickup_phone TEXT,

    -- Fields for PDF donations
    pdf_title TEXT,
    pdf_author TEXT,
    pdf_genre TEXT,
    file_name TEXT,
    file_url TEXT
);

-- Enable Row Level Security for the donations table
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Policies for donations table
DROP POLICY IF EXISTS "Allow public read access" ON public.donations;
CREATE POLICY "Allow public read access" ON public.donations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.donations;
CREATE POLICY "Allow authenticated users to insert" ON public.donations FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous users to insert" ON public.donations;
CREATE POLICY "Allow anonymous users to insert" ON public.donations FOR INSERT TO anon WITH CHECK (true);

-- Create a bucket for donations if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('donations', 'donations', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for donations storage bucket
DROP POLICY IF EXISTS "Allow public uploads to donations bucket" ON storage.objects;
CREATE POLICY "Allow public uploads to donations bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK ( bucket_id = 'donations' );

DROP POLICY IF EXISTS "Allow public reads from donations bucket" ON storage.objects;
CREATE POLICY "Allow public reads from donations bucket"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'donations' );

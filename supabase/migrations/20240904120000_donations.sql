-- Create the 'donations' table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donation_type TEXT NOT NULL CHECK (donation_type IN ('book', 'pdf')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'pickup_scheduled', 'completed', 'cancelled')),
    
    -- Fields for book donations
    donated_books JSONB,
    pickup_address TEXT,
    pickup_city TEXT,
    pickup_state TEXT,
    pickup_pincode TEXT,
    pickup_phone TEXT,

    -- Fields for PDF donations
    file_name TEXT,
    file_url TEXT,
    pdf_title TEXT,
    pdf_author TEXT
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for the 'donations' table
-- Allow public access for inserting new donations
CREATE POLICY "Allow public insert for donations" ON public.donations FOR INSERT WITH CHECK (true);

-- Allow users to view their own donations
CREATE POLICY "Allow individual user to select their own donations" ON public.donations FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to update their own donations
CREATE POLICY "Allow individual user to update their own donations" ON public.donations FOR UPDATE
USING (auth.uid() = user_id);

-- Create a bucket for 'donations' if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('donations', 'donations', true, 5242880, ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Policies for storage are managed through the bucket settings now.
-- The following policies ensure that anyone can upload to the 'donations' bucket.
-- You can tighten this in the Supabase Dashboard under Storage -> Policies.
CREATE POLICY "Allow public uploads to donations bucket" ON storage.objects
FOR INSERT TO authenticated, anon
WITH CHECK ( bucket_id = 'donations' );

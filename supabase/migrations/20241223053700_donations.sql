
-- 1. Create Donations Table
-- This table will store all donation records, for both physical books and PDFs.
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donation_type TEXT NOT NULL CHECK (donation_type IN ('book', 'pdf')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'pickup_scheduled', 'completed', 'cancelled')),

    -- Fields for 'book' donations
    donated_books JSONB,
    pickup_address TEXT,
    pickup_city TEXT,
    pickup_state TEXT,
    pickup_pincode TEXT,
    pickup_phone TEXT,

    -- Fields for 'pdf' donations
    file_name TEXT,
    file_url TEXT
);

-- Add comments to the columns for clarity in the Supabase dashboard
COMMENT ON TABLE public.donations IS 'Stores all book and PDF donation records from users.';
COMMENT ON COLUMN public.donations.user_id IS 'Reference to the user if logged in.';
COMMENT ON COLUMN public.donations.donated_books IS 'A JSON array of book objects being donated.';
COMMENT ON COLUMN public.donations.pickup_address IS 'Full pickup address for physical book donations.';
COMMENT ON COLUMN public.donations.file_url IS 'Public URL of the uploaded PDF file in Supabase Storage.';


-- 2. Create Supabase Storage Bucket for Donations
-- This bucket will store the PDF files that users donate.
INSERT INTO storage.buckets (id, name, public)
VALUES ('donations', 'donations', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Row-Level Security (RLS) for the Donations Table
-- Enable RLS on the table
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- POLICY: Allow public read access to all donation records.
-- This is generally safe as sensitive personal data should not be exposed on the frontend.
-- If more privacy is needed, this can be restricted.
CREATE POLICY "Allow public read access on donations"
ON public.donations
FOR SELECT
USING (true);

-- POLICY: Allow anyone to create a new donation record.
-- This is necessary for the public donation form to work.
CREATE POLICY "Allow anyone to create a donation"
ON public.donations
FOR INSERT
WITH CHECK (true);


-- 4. Row-Level Security (RLS) for the Donations Storage Bucket
-- Enable RLS on the storage objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- POLICY: Allow public read access to all files in the 'donations' bucket.
-- This allows anyone with the URL to view the donated PDFs.
CREATE POLICY "Allow public read access on donation files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'donations');

-- POLICY: Allow anyone to upload a file to the 'donations' bucket.
-- This is required for the PDF donation form to function correctly.
CREATE POLICY "Allow anyone to upload to donations bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'donations');


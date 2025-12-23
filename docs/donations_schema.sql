
-- 1. Enable Row-Level Security on tables
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donated_books ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for 'donations' table
-- Allow public read access to all donations
CREATE POLICY "Allow public read access to donations" ON donations
FOR SELECT USING (true);

-- Allow users to insert their own donations
CREATE POLICY "Allow users to insert their own donation" ON donations
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own donations (e.g., to cancel)
CREATE POLICY "Allow users to update their own donations" ON donations
FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own donations
CREATE POLICY "Allow users to delete their own donations" ON donations
FOR DELETE USING (auth.uid() = user_id);

-- 3. Create policies for 'donated_books' table
-- Allow public read access to all donated books by joining with donations
CREATE POLICY "Allow public read access to donated books" ON donated_books
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM donations WHERE donations.id = donated_books.donation_id
  )
);

-- Allow users to insert books for their own donation
CREATE POLICY "Allow users to insert books for their own donation" ON donated_books
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM donations 
    WHERE donations.id = donated_books.donation_id AND donations.user_id = auth.uid()
  )
);

-- NOTE: Update/Delete on donated_books can be cascade-deleted with the parent donation,
-- or you can add specific policies here if needed.

-- 4. Create a bucket for PDF uploads called 'pdfs' if it doesn't exist
-- Make it public for easy access to download links.
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Create policies for 'pdfs' bucket in Supabase Storage
-- Allow anyone to view PDFs
CREATE POLICY "Allow public read access to PDFs" ON storage.objects
FOR SELECT USING (bucket_id = 'pdfs');

-- Allow authenticated users to upload PDFs
CREATE POLICY "Allow authenticated users to upload PDFs" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'pdfs' AND 
  auth.role() = 'authenticated' AND
  -- Optional: Restrict uploads to a 'donations/' folder
  storage.filename(name) LIKE 'donations/%'
);

-- Optional: Allow users to delete their own uploaded PDFs
-- This requires the file path to contain the user's ID.
-- Example path: donations/{user_id}/{donation_id}/{file_name}
-- CREATE POLICY "Allow users to delete their own PDFs" ON storage.objects
-- FOR DELETE USING (
--   bucket_id = 'pdfs' AND
--   auth.uid() = (storage.foldername(name))[2]::uuid
-- );

-- Create 'donations' table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donation_type TEXT NOT NULL CHECK (donation_type IN ('book', 'pdf')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'pickup_scheduled', 'completed', 'cancelled')),
    pickup_address TEXT,
    pickup_city TEXT,
    pickup_state TEXT,
    pickup_pincode TEXT,
    pickup_phone TEXT,
    pickup_date DATE,
    file_name TEXT,
    file_url TEXT
);

-- Create 'donated_books' table
CREATE TABLE IF NOT EXISTS public.donated_books (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1
);

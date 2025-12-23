-- Create the 'donations' table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donation_type TEXT NOT NULL CHECK (donation_type IN ('book', 'pdf')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'pickup_scheduled', 'completed', 'cancelled')),
    donated_books JSONB,
    pickup_address TEXT,
    pickup_city TEXT,
    pickup_state TEXT,
    pickup_pincode TEXT,
    pickup_phone TEXT,
    file_name TEXT,
    file_url TEXT
);

-- Enable Row Level Security for the 'donations' table
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for the 'donations' table
CREATE POLICY "Allow public insert for anyone"
ON public.donations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow admin full access"
ON public.donations FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');


-- Create the 'donations' storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('donations', 'donations', false)
ON CONFLICT (id) DO NOTHING;

-- Create policies for the 'donations' storage bucket
CREATE POLICY "Allow public insert to donations bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'donations');

CREATE POLICY "Allow public select from donations bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'donations');

-- Add comments to tables and columns
COMMENT ON TABLE public.donations IS 'Stores all book and PDF donation records.';
COMMENT ON COLUMN public.donations.id IS 'Unique identifier for the donation record.';
COMMENT ON COLUMN public.donations.donated_books IS 'JSONB array of donated book objects.';

--
-- Create a table for public profiles
--
CREATE TABLE
  public.profiles (
    id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT NULL,
    avatar_url TEXT NULL,
    updated_at TIMESTAMPTZ NULL,
    CONSTRAINT profiles_pkey PRIMARY KEY (id)
  );

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR
SELECT
  USING (TRUE);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT
WITH
  CHECK (auth.uid () = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile." ON public.profiles FOR
UPDATE
  USING (auth.uid () = id)
WITH
  CHECK (auth.uid () = id);

--
-- Create a table for community posts
--
CREATE TABLE
  public.community_posts (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id UUID NOT NULL DEFAULT auth.uid (),
    CONSTRAINT community_posts_pkey PRIMARY KEY (id),
    CONSTRAINT community_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles (id) ON DELETE CASCADE
  );

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Allow logged-in users to create posts
CREATE POLICY "Allow logged-in users to create posts" ON public.community_posts FOR INSERT
WITH
  CHECK (auth.role () = 'authenticated');

-- Allow anyone to read posts
CREATE POLICY "Allow anyone to read posts" ON public.community_posts FOR
SELECT
  USING (TRUE);

-- Allow owners to delete their posts
CREATE POLICY "Allow owners to delete their posts" ON public.community_posts FOR DELETE USING (auth.uid () = user_id);

--
-- Create a table for community comments/replies
--
CREATE TABLE
  public.community_comments (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    content TEXT NOT NULL,
    user_id UUID NOT NULL DEFAULT auth.uid (),
    post_id UUID NOT NULL,
    CONSTRAINT community_comments_pkey PRIMARY KEY (id),
    CONSTRAINT community_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.community_posts (id) ON DELETE CASCADE,
    CONSTRAINT community_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles (id) ON DELETE CASCADE
  );

ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

-- Allow logged-in users to create comments
CREATE POLICY "Allow logged-in users to create comments" ON public.community_comments FOR INSERT
WITH
  CHECK (auth.role () = 'authenticated');

-- Allow anyone to read comments
CREATE POLICY "Allow anyone to read comments" ON public.community_comments FOR
SELECT
  USING (TRUE);

-- Allow owners to delete their comments
CREATE POLICY "Allow owners to delete their comments" ON public.community_comments FOR DELETE USING (auth.uid () = user_id);

--
-- Set up a trigger to automatically create a profile entry for new users
--
CREATE OR REPLACE FUNCTION public.handle_new_user () RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user ();

--
-- Enable real-time for posts and comments tables
--
ALTER PUBLICATION supabase_realtime
ADD
  TABLE public.community_posts,
  public.community_comments;

-- Inform PostgREST about the schema changes
NOTIFY pgrst,
'reload schema';

-- 1. Create Profiles Table
-- This table will store public user data.
create table public.profiles (
  id uuid not null primary key,
  full_name text,
  avatar_url text
);

-- 2. Link Profiles to Auth Users
-- This sets up a one-to-one relationship between auth.users and public.profiles.
alter table public.profiles
  add constraint profiles_id_fkey
  foreign key (id) references auth.users(id) on delete cascade;

-- 3. Create Posts Table
-- This table will store the community discussion posts.
create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null,
  user_id uuid references public.profiles(id) not null
);

-- 4. Create Comments Table
-- This table will store replies to posts.
create table public.community_comments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text not null,
  user_id uuid references public.profiles(id) not null,
  post_id uuid references public.community_posts(id) on delete cascade not null
);

-- 5. Create Profile on New User Signup
-- This function and trigger automatically create a profile for new users.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Set up Row Level Security (RLS)
-- Enable RLS for all tables
alter table public.profiles enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;

-- Policies for Profiles table
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Policies for Posts table
create policy "Community posts are viewable by everyone." on public.community_posts
  for select using (true);

create policy "Users can insert their own posts." on public.community_posts
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own posts." on public.community_posts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete their own posts." on public.community_posts
  for delete using (auth.uid() = user_id);

-- Policies for Comments table
create policy "Community comments are viewable by everyone." on public.community_comments
  for select using (true);

create policy "Users can insert their own comments." on public.community_comments
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own comments." on public.community_comments
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete their own comments." on public.community_comments
  for delete using (auth.uid() = user_id);

-- 7. Enable Realtime on tables
-- This is necessary for the live-update functionality.
alter publication supabase_realtime add table public.community_posts;
alter publication supabase_realtime add table public.community_comments;

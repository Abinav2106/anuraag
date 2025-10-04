# Supabase Environment Variables Template

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How to get your Supabase credentials:

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the Project URL and paste it as `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the anon/public key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Authentication Setup:

1. In Supabase dashboard, go to Authentication > Settings
2. Enable Email authentication
3. Configure Google OAuth (optional):
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

## Database Setup (Optional):

If you need user profiles or additional data:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  PRIMARY KEY (id),
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );
```

## Demo Mode:

If you don't set up Supabase credentials, the app will run in demo mode with simulated authentication responses.

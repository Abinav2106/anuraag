import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

export const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co';

export const supabase = isDemoMode
  ? { // Mock Supabase client for demo mode
      auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => {
          // Simulate no auth changes in demo mode
          return { data: { subscription: { unsubscribe: () => {} } } };
        },
        signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Demo mode: Login disabled.' } }),
        signUp: async () => ({ data: { user: null }, error: { message: 'Demo mode: Signup disabled.' } }),
        signInWithOAuth: async () => ({ data: { url: null }, error: { message: 'Demo mode: Google OAuth disabled.' } }),
        signOut: async () => ({ error: null }),
      },
    }
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

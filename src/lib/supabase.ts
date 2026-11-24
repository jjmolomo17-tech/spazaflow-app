import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabase.co';
const supabaseAnonKey = 'PASTE_YOUR_SUPABASE_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabase.co';
const supabaseAnonKey = 'sb_publishable_jauJr1mDijuHU81q6uTFvw_kVcQHy0T';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

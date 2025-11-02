require('dotenv').config(); // must be the first line

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.log('SUPABASE_URL:', supabaseUrl);
  console.log('SUPABASE_ANON_KEY:', !!supabaseAnonKey ? 'Loaded' : 'Missing');
  process.exit(1); // stop server if not found
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
 
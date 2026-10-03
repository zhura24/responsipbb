// src/db/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

let supabaseUrl = (process.env.SUPABASE_URL || '').trim();
let supabaseAnonKey = (process.env.SUPABASE_ANON_KEY || '').trim();

// Format URL if user entered just project ref or missing https://
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  if (supabaseUrl.includes('.')) {
    supabaseUrl = `https://${supabaseUrl}`;
  } else {
    supabaseUrl = `https://${supabaseUrl}.supabase.co`;
  }
}

let supabase = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (err) {
  console.error('Failed to initialize Supabase client:', err.message);
}

module.exports = supabase;

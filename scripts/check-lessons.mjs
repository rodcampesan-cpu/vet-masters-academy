import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgrdcnhloocwffjtdgbr.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl'; // Actually, let's look up the anon key from .env

// Better to just read .env
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function check() {
  const { data, error } = await supabase.from('lessons').select('id, title');
  console.log(data);
}
check();

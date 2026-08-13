import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgrdcnhloocwffjtdgbr.supabase.co';
const supabaseKey = 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl'; // I will use the anon key. Wait, this is from the seed script.

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('clinical_cases').select('id, title, author_email');
  if (error) console.error(error);
  console.log("Cases:", data?.length, data);
}
check();

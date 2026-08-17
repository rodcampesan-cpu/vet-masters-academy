import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://pgrdcnhloocwffjtdgbr.supabase.co', 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl');

async function main() {
  const lessonId = '9e37698f-b86b-40f9-9079-b3a3e5b01ae2';
  
  const { data, error } = await supabase
    .from('lessons')
    .update({ material_url: null })
    .eq('id', lessonId)
    .select();
    
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success:", data);
  }
}
main();

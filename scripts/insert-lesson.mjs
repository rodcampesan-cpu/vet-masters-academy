import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pgrdcnhloocwffjtdgbr.supabase.co';
const supabaseKey = 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: m1 } = await supabase.from('modules').select('id, course_id').eq('title', 'Módulo 1 — Introdução à Ortopedia Clínica').limit(1).single();
  if (!m1) return console.log('Modulo 1 não encontrado');
  
  const { data: lessons } = await supabase.from('lessons').select('*').eq('module_id', m1.id).order('order');
  console.log("Current lessons:");
  console.log(lessons.map(l => `${l.order}: ${l.title}`).join('\n'));

  // Increment order for lessons 2 to end (since we want to insert at index 2)
  /*
  for (const lesson of lessons) {
    if (lesson.order >= 2) {
      await supabase.from('lessons').update({ order: lesson.order + 1 }).eq('id', lesson.id);
    }
  }
  */

  // Insert the new lesson at index 2 (which means it's the 2nd lesson, as it's 1-indexed)
  const { data: newLesson, error } = await supabase.from('lessons').insert({
    module_id: m1.id,
    title: 'Descomplicando a neuroanatomia',
    order: 2
  }).select();

  if (error) console.error("Error inserting:", error);
  else console.log("Success inserting:", newLesson);
}
main();

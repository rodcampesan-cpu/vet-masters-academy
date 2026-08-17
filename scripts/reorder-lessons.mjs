import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://pgrdcnhloocwffjtdgbr.supabase.co', 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl');

async function main() {
  const moduleId = '702acb96-0bc9-4257-afaa-e138c61be44f';
  
  // Desired order
  const desiredOrder = [
    "Biomecânica do cão e gato na clínica médica",
    "Descomplicando a neuroanatomia",
    "Como realizar uma avaliação clínica de excelência",
    "Biologia x score da lesão ortopédica",
    "Montando uma anamnese ortopédica",
    "Alterações ortopédicas clássicas e como tratá-las"
  ];
  
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId);
    
  if (error || !lessons) return console.error("Error fetching lessons:", error);

  for (let i = 0; i < desiredOrder.length; i++) {
    const lessonTitle = desiredOrder[i];
    const lesson = lessons.find(l => l.title === lessonTitle);
    if (lesson) {
      await supabase.from('lessons').update({ order: i + 1 }).eq('id', lesson.id);
      console.log(`Updated "${lessonTitle}" to order ${i + 1}`);
    } else {
      console.log(`Lesson "${lessonTitle}" not found in DB!`);
    }
  }
  
  console.log("Done reverting order!");
}
main();

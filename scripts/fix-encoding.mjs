import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// Map corrupted string to proper string
const fixes = {
  'Biomec nica do c o e gato na cl nica m dica': 'Biomecânica do cão e gato na clínica médica',
  'Anamnese e Exame F sico Geral': 'Anamnese e Exame Físico Geral',
  'Exame Ortop dico e Neurol gico Espec fico': 'Exame Ortopédico e Neurológico Específico',
  'Radiografia na Ortopedia': 'Radiografia na Ortopedia',
  'Ultrassonografia e Tomografia': 'Ultrassonografia e Tomografia',
  'Fraturas de R dio e Ulna': 'Fraturas de Rádio e Ulna',
  'Fraturas de T bia e F bula': 'Fraturas de Tíbia e Fíbula',
  'Ruptura de Ligamento Cruzado Cranial': 'Ruptura de Ligamento Cruzado Cranial',
  'Luxa  o de Patela': 'Luxação de Patela',
  'Displasia Coxofemoral': 'Displasia Coxofemoral',
  'Necrose Ass ptica da Cabe a do F mur': 'Necrose Asséptica da Cabeça do Fêmur',
  'Manejo de Feridas Ortop dicas': 'Manejo de Feridas Ortopédicas',
  'Uso de C lulas-tronco': 'Uso de Células-tronco',
  'Montando uma anamnese ortop dica': 'Montando uma anamnese ortopédica',
  'Princ pios de Osteoss ntese': 'Princípios de Osteossíntese',
  'Fraturas de F mur e  mero': 'Fraturas de Fêmur e Úmero'
};

async function fix() {
  const { data, error } = await supabase.from('lessons').select('id, title');
  
  for (const lesson of data) {
    const fixedTitle = fixes[lesson.title];
    if (fixedTitle && fixedTitle !== lesson.title) {
      console.log(`Fixing: ${lesson.title} -> ${fixedTitle}`);
      await supabase.from('lessons').update({ title: fixedTitle }).eq('id', lesson.id);
    }
  }
  
  // Wait, I should also check modules!
  const { data: modData } = await supabase.from('modules').select('id, title');
  for (const mod of modData) {
    let fixedMod = mod.title.replace('M dulo', 'Módulo');
    fixedMod = fixedMod.replace('Introdu  o', 'Introdução');
    fixedMod = fixedMod.replace('Diagn stico', 'Diagnóstico');
    fixedMod = fixedMod.replace('Terapias Avan adas', 'Terapias Avançadas');
    fixedMod = fixedMod.replace('T cnicas', 'Técnicas');
    fixedMod = fixedMod.replace('Afec  es', 'Afecções');
    fixedMod = fixedMod.replace('Articula  es', 'Articulações');
    
    if (fixedMod !== mod.title) {
       console.log(`Fixing mod: ${mod.title} -> ${fixedMod}`);
       await supabase.from('modules').update({ title: fixedMod }).eq('id', mod.id);
    }
  }
  
  // Check courses? 
  const { data: courseData } = await supabase.from('courses').select('id, title');
  for (const c of courseData) {
    let fixedCourse = c.title.replace('Ortopedia Cl nica de Excel ncia', 'Ortopedia Clínica de Excelência');
    if (fixedCourse !== c.title) {
      console.log(`Fixing course: ${c.title} -> ${fixedCourse}`);
      await supabase.from('courses').update({ title: fixedCourse }).eq('id', c.id);
    }
  }

  console.log('Done!');
}

fix();

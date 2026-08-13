import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgrdcnhloocwffjtdgbr.supabase.co';
const supabaseKey = 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl';

const supabase = createClient(supabaseUrl, supabaseKey);

const ortopediaModules = [
  {
    title: "Módulo 1 — Introdução à Ortopedia Clínica",
    topics: [
      "Biomecânica do cão e gato na clínica médica",
      "Como realizar uma avaliação clínica de excelência",
      "Biologia x score da lesão ortopédica",
      "Montando uma anamnese ortopédica",
      "Alterações ortopédicas clássicas e como tratá-las"
    ]
  },
  {
    title: "Módulo 2 — Diferenciando lesão motora muscular x neurológica",
    topics: [
      "Sinais clínicos",
      "Testes de reflexo",
      "Casos práticos de diagnóstico diferencial"
    ]
  },
  {
    title: "Módulo 3 — Tratando lesões ortopédicas",
    topics: [
      "Protocolos de tratamento conservador",
      "Indicações cirúrgicas",
      "Manejo da dor"
    ]
  },
  {
    title: "Módulo 4 — A conexão com o tutor é o sucesso do tratamento",
    topics: [
      "Como comunicar o diagnóstico",
      "Alinhando expectativas",
      "Adesão ao tratamento em casa"
    ]
  },
  {
    title: "Módulo 5 — Manejo Alimentar",
    topics: [
      "Importância da nutrição na recuperação ortopédica",
      "Suplementação: Condroprotetores e Ômega-3",
      "Controle e manejo de peso no paciente osteoartrósico",
      "Dietas terapêuticas e prescrição nutricional",
      "Casos práticos de evolução com suporte nutricional"
    ]
  },
  {
    title: "Módulo 6 — Tipos de Exames na Ortopedia e Neurologia",
    topics: [
      "Radiografia Simples vs. Contrastada: Indicações cruciais",
      "Tomografia Computadorizada (TC): Quando o Raio-X não é suficiente?",
      "Ressonância Magnética (RM): O padrão-ouro para lesões neurológicas",
      "Diferenciais e Critérios de Encaminhamento: Quando e qual exame solicitar"
    ]
  },
  {
    title: "Módulo 7 — 90% das alterações que vão chegar na sua clínica",
    topics: [
      "Displasia Coxofemoral",
      "Ruptura de Ligamento Cruzado Cranial (RLCC)",
      "Artrose Articular",
      "Doença do Disco Intervertebral (DDIV)",
      "Alterações Metabólicas"
    ]
  }
];

async function seedOrtopedia() {
  console.log('🦴 Cadastrando curso de Ortopedia do Dr. Rodrigo Nicola...\n');

  // 1. Verificar se o curso já existe
  const { data: existingCourses } = await supabase
    .from('courses')
    .select('id, title')
    .ilike('title', '%ortopedia%');

  if (existingCourses && existingCourses.length > 0) {
    console.log('⚠️  Curso de Ortopedia já existe no banco:');
    existingCourses.forEach(c => console.log(`   → ${c.title} (ID: ${c.id})`));
    console.log('\n   Removendo e recriando...');
    
    for (const c of existingCourses) {
      await supabase.from('courses').delete().eq('id', c.id);
    }
    console.log('   ✅ Curso antigo removido.\n');
  }

  // 2. Criar o curso
  console.log('📚 Criando curso...');
  const { data: courseData, error: courseError } = await supabase.from('courses').insert({
    title: 'Ortopedia Clínica de Excelência',
    specialty: 'Ortopedia',
    description: 'Domine a ortopedia clínica sem precisar operar. Aprenda a diagnosticar com segurança, solicitar exames precisos e conduzir atendimentos que encantam o tutor, gerando confiança absoluta na sua conduta médica.',
    cover_url: 'https://images.unsplash.com/photo-1628102491629-77858ab5721d?q=80&w=2000&auto=format&fit=crop',
    level: 'Avançado',
    teacher_name: 'Dr. Rodrigo Nicola',
    featured: true
  }).select().single();

  if (courseError) {
    console.error('❌ Erro ao criar curso:', courseError.message);
    return;
  }

  const courseId = courseData.id;
  console.log(`✅ Curso criado! ID: ${courseId}\n`);

  // 3. Criar módulos e aulas
  let totalAulas = 0;

  for (let i = 0; i < ortopediaModules.length; i++) {
    const mod = ortopediaModules[i];
    console.log(`📦 Módulo ${i + 1}: ${mod.title}`);

    const { data: modData, error: modError } = await supabase.from('modules').insert({
      course_id: courseId,
      title: mod.title,
      order: i + 1
    }).select().single();

    if (modError) {
      console.error(`   ❌ Erro ao criar módulo: ${modError.message}`);
      continue;
    }

    const moduleId = modData.id;

    // Criar aulas do módulo
    const lessonsToInsert = mod.topics.map((topic, idx) => ({
      module_id: moduleId,
      title: topic,
      video_url: '',
      order: idx + 1,
      duration_minutes: 0
    }));

    const { error: lessonsError } = await supabase.from('lessons').insert(lessonsToInsert);

    if (lessonsError) {
      console.error(`   ❌ Erro ao criar aulas: ${lessonsError.message}`);
    } else {
      console.log(`   ✅ ${mod.topics.length} aulas criadas`);
      mod.topics.forEach((t, idx) => console.log(`      ${idx + 1}. ${t}`));
      totalAulas += mod.topics.length;
    }
    console.log('');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🎉 CONCLUÍDO!`);
  console.log(`   📚 1 curso criado: Ortopedia Clínica de Excelência`);
  console.log(`   📦 ${ortopediaModules.length} módulos criados`);
  console.log(`   🎬 ${totalAulas} aulas cadastradas`);
  console.log(`   👨‍⚕️ Professor: Dr. Rodrigo Nicola`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

seedOrtopedia().catch(console.error);

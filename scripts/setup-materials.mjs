import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgrdcnhloocwffjtdgbr.supabase.co';
const supabaseKey = 'sb_publishable_7I83WxTkL7oEk4aXU6FwNg_NrCehfXl';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupLessonMaterials() {
  console.log('🔧 Configurando upload de materiais...\n');

  // 1. Testar se o bucket já existe tentando listar
  console.log('1️⃣  Verificando bucket de storage "lesson-materials"...');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.log('⚠️  Não foi possível listar buckets (talvez precise da service_role key):', bucketsError.message);
  } else {
    const exists = buckets?.some(b => b.name === 'lesson-materials');
    if (exists) {
      console.log('✅ Bucket "lesson-materials" já existe!\n');
    } else {
      console.log('📦 Criando bucket "lesson-materials"...');
      const { data, error } = await supabase.storage.createBucket('lesson-materials', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
        allowedMimeTypes: ['application/pdf']
      });
      if (error) {
        console.log('⚠️  Erro ao criar bucket:', error.message);
        console.log('   → Pode ser necessário criar o bucket manualmente no painel do Supabase.');
      } else {
        console.log('✅ Bucket criado com sucesso!\n');
      }
    }
  }

  // 2. Testar upload com um pequeno arquivo de teste
  console.log('2️⃣  Testando upload no bucket...');
  const testContent = new Blob(['teste'], { type: 'text/plain' });
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('lesson-materials')
    .upload('_test/test.txt', testContent, { upsert: true });

  if (uploadError) {
    console.log('⚠️  Upload de teste falhou:', uploadError.message);
    console.log('   → O bucket precisa ser criado manualmente no Supabase Dashboard.');
    console.log('   → Vá em: Storage → New Bucket → Nome: "lesson-materials" → Public: ON\n');
  } else {
    console.log('✅ Upload funcionando!\n');
    // Limpar arquivo de teste
    await supabase.storage.from('lesson-materials').remove(['_test/test.txt']);
  }

  // 3. Testar se as colunas material_url e material_name existem na tabela lessons
  console.log('3️⃣  Verificando colunas na tabela lessons...');
  const { data: lessonsData, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, material_url, material_name')
    .limit(1);

  if (lessonsError) {
    if (lessonsError.message.includes('material_url') || lessonsError.message.includes('material_name')) {
      console.log('⚠️  Colunas material_url/material_name não existem na tabela lessons.');
      console.log('   → Execute o SQL abaixo no Supabase SQL Editor:\n');
      console.log('   ALTER TABLE lessons ADD COLUMN IF NOT EXISTS material_url TEXT;');
      console.log('   ALTER TABLE lessons ADD COLUMN IF NOT EXISTS material_name TEXT;\n');
    } else {
      console.log('⚠️  Erro ao verificar tabela lessons:', lessonsError.message);
    }
  } else {
    console.log('✅ Tabela lessons OK com colunas de material!\n');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 Verificação concluída!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

setupLessonMaterials().catch(console.error);

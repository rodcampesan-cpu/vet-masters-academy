-- Drop tables se já existirem (para testes)
-- DROP TABLE IF EXISTS student_progress;
-- DROP TABLE IF EXISTS lessons;
-- DROP TABLE IF EXISTS modules;
-- DROP TABLE IF EXISTS courses;

-- Tabela de Cursos
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  level TEXT CHECK (level IN ('Iniciante', 'Intermediário', 'Avançado')),
  teacher_name TEXT NOT NULL,
  teacher_id UUID REFERENCES auth.users(id),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Módulos (Filhos dos Cursos)
CREATE TABLE IF NOT EXISTS modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Aulas (Filhas dos Módulos)
CREATE TABLE IF NOT EXISTS lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT, -- Link do Youtube / Vimeo
  duration_minutes INTEGER DEFAULT 0,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Progresso do Aluno
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);

-- Habilitar RLS (Row Level Security) para proteção dos dados
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de Segurança (Policies)

-- Cursos, módulos e aulas podem ser VISTOS por qualquer usuário autenticado (ou público)
CREATE POLICY "Public profiles are viewable by everyone." 
ON courses FOR SELECT USING (true);

CREATE POLICY "Modules are viewable by everyone." 
ON modules FOR SELECT USING (true);

CREATE POLICY "Lessons are viewable by everyone." 
ON lessons FOR SELECT USING (true);

-- Apenas o aluno logado pode ver e atualizar o seu próprio progresso
CREATE POLICY "Users can view their own progress" 
ON student_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
ON student_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON student_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Para simplificar o MVP, vamos permitir que professores (ou qualquer user por enquanto) insiram cursos
-- Idealmente, isso deveria ter uma restrição checando se o user_role = 'teacher'
CREATE POLICY "Anyone can insert courses" ON courses FOR ALL USING (true);
CREATE POLICY "Anyone can insert modules" ON modules FOR ALL USING (true);
CREATE POLICY "Anyone can insert lessons" ON lessons FOR ALL USING (true);

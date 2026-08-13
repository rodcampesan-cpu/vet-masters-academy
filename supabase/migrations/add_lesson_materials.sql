-- ==========================================
-- Script para adicionar suporte a PDFs nas aulas
-- Execute este script no SQL Editor do Supabase
-- ==========================================

-- 1. Adicionar campo material_url à tabela de lessons
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS material_url TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS material_name TEXT;

-- 2. Criar bucket de storage para materiais das aulas
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lesson-materials', 
  'lesson-materials', 
  true, 
  52428800, -- 50MB limit
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 3. Políticas de storage para permitir upload e leitura

-- Permitir leitura pública dos materiais
CREATE POLICY "Public Access to lesson materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'lesson-materials');

-- Permitir upload por usuários autenticados
CREATE POLICY "Authenticated users can upload lesson materials"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'lesson-materials' 
  AND auth.role() = 'authenticated'
);

-- Permitir que o dono delete seus materiais
CREATE POLICY "Users can delete their own lesson materials"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'lesson-materials' 
  AND auth.uid() = owner
);

-- Permitir que o dono atualize seus materiais
CREATE POLICY "Users can update their own lesson materials"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'lesson-materials' 
  AND auth.uid() = owner
);

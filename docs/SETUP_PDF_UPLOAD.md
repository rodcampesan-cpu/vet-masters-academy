# 🔧 Configurar Upload de PDFs no Supabase

## Passo a Passo (2 minutos)

O upload de PDFs já funciona **localmente no navegador**. Para ativar o armazenamento **na nuvem** (recomendado para produção), siga estes passos:

---

### 1. Criar o Bucket de Storage

1. Acesse: https://supabase.com/dashboard → seu projeto
2. Vá em **Storage** (menu lateral)
3. Clique em **New Bucket**
4. Preencha:
   - **Name**: `lesson-materials`
   - **Public**: ✅ Ativado
   - **File size limit**: `50MB`
   - **Allowed MIME types**: `application/pdf`
5. Clique em **Create Bucket**

### 2. Configurar Políticas de Acesso

Ainda em **Storage** → selecione o bucket `lesson-materials` → aba **Policies**:

**Policy 1 — Leitura pública:**
- Name: `Public read`
- Allowed operation: `SELECT`
- Policy: `true`

**Policy 2 — Upload autenticado:**
- Name: `Auth upload`
- Allowed operation: `INSERT`
- Policy: `auth.role() = 'authenticated'`

### 3. Adicionar Colunas na Tabela Lessons

Vá em **SQL Editor** e execute:

```sql
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS material_url TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS material_name TEXT;
```

### 4. Pronto! ✅

O sistema já detecta automaticamente se o bucket existe. Se existir, faz upload na nuvem. Se não, salva localmente.

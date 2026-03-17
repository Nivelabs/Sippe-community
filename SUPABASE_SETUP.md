# 🗄️ Supabase Setup - Sippe

Este documento contém todas as instruções para configurar o Supabase no projeto Sippe.

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Node.js 18+
- npm ou yarn

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha:
   - **Organization**: Sua organização
   - **Name**: sippe-production (ou outro nome)
   - **Database Password**: Crie uma senha forte
   - **Region**: South America (São Paulo) - `sa-east-1`
   - **Pricing Plan**: Free ou Pro

4. Aguarde a criação do projeto (~2 minutos)

### 2. Obter Credenciais

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (chave pública)
   - **service_role** key (chave privada - NUNCA exponha ao frontend)

### 3. Configurar Variáveis de Ambiente

1. Renomeie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Preencha as variáveis:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 4. Executar Migrations

#### Opção 1: Via SQL Editor (Recomendado)

1. No Supabase Dashboard, vá em **SQL Editor**
2. Clique em "New Query"
3. Copie todo o conteúdo do arquivo `supabase/migrations/20260314000000_initial_schema.sql`
4. Cole no editor e clique em **Run**
5. Aguarde a execução (pode demorar alguns segundos)

#### Opção 2: Via Supabase CLI

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Conectar ao projeto
supabase link --project-ref your-project-ref

# Executar migrations
supabase db push
```

### 5. Verificar Tabelas Criadas

1. Vá em **Table Editor** no dashboard
2. Você deve ver as seguintes tabelas:
   - ✅ `profiles`
   - ✅ `communities`
   - ✅ `community_members`
   - ✅ `posts`
   - ✅ `post_likes`
   - ✅ `comments`
   - ✅ `courses`
   - ✅ `lessons`
   - ✅ `events`
   - ✅ `event_attendees`
   - ✅ `tags`
   - ✅ `community_tags`

### 6. Configurar Autenticação

1. Vá em **Authentication** → **Providers**
2. Ative os providers que deseja:
   - ✅ **Email** (já vem ativado)
   - ⚙️ **Google** (opcional)
   - ⚙️ **GitHub** (opcional)

#### Configurar Google OAuth (Opcional)

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Vá em "APIs & Services" → "Credentials"
4. Clique em "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `https://your-project.supabase.co/auth/v1/callback`
6. Copie o **Client ID** e **Client Secret**
7. No Supabase, vá em **Authentication** → **Providers** → **Google**
8. Cole as credenciais e salve

### 7. Configurar Storage (Para Upload de Imagens)

1. Vá em **Storage**
2. Crie os seguintes buckets:
   - `avatars` (público)
   - `covers` (público)
   - `posts` (público)
   - `courses` (privado)

3. Configure as políticas de acesso:

```sql
-- Bucket: avatars
-- Política: Usuários podem fazer upload do próprio avatar
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política: Avatares são públicos
CREATE POLICY "Avatars are public"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

### 8. Testar Conexão

Execute o projeto localmente:

```bash
npm run dev
```

Verifique no console se há erros de conexão com o Supabase.

## 🔐 Segurança

### Row Level Security (RLS)

Todas as tabelas têm RLS ativado. As políticas implementadas garantem:

- ✅ Usuários só podem editar seus próprios dados
- ✅ Membros só podem postar em comunidades que pertencem
- ✅ Apenas donos podem deletar comunidades
- ✅ Dados públicos são acessíveis sem autenticação

### Variáveis de Ambiente

⚠️ **NUNCA** commite o arquivo `.env.local` no Git!

O `.gitignore` já está configurado para ignorar este arquivo.

## 📊 Schema do Banco de Dados

### Principais Tabelas

#### `profiles`
Estende `auth.users` com dados do perfil
- Criado automaticamente via trigger no signup
- Sincronizado com autenticação do Supabase

#### `communities`
Comunidades criadas na plataforma
- Relacionamento: `owner_id` → `profiles.id`
- Contadores automáticos: `member_count`, `online_count`

#### `community_members`
Membros de cada comunidade (many-to-many)
- Roles: `owner`, `admin`, `moderator`, `member`
- Sistema de pontos e níveis para gamificação

#### `posts`
Posts dentro das comunidades
- Suporta imagens
- Sistema de pins (posts fixados)
- Contadores: `likes_count`, `comments_count`

#### `post_likes`
Curtidas em posts
- Unique constraint: um usuário não pode curtir o mesmo post duas vezes
- Trigger atualiza automaticamente `posts.likes_count`

## 🔄 Realtime

O Supabase Realtime já está configurado. Para habilitar em tabelas específicas:

1. Vá em **Database** → **Replication**
2. Selecione as tabelas que deseja ter realtime
3. Ative o toggle "Enable realtime"

Tabelas recomendadas:
- ✅ `posts`
- ✅ `post_likes`
- ✅ `comments`
- ✅ `community_members`

## 🛠️ Comandos Úteis

### Resetar Database (⚠️ CUIDADO!)

```sql
-- Deleta todas as tabelas (desenvolvimento apenas!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

### Ver Usuários Autenticados

```sql
SELECT * FROM auth.users;
```

### Ver Estatísticas

```sql
-- Top comunidades
SELECT name, member_count
FROM communities
ORDER BY member_count DESC
LIMIT 10;

-- Posts mais curtidos
SELECT p.content, p.likes_count, c.name as community
FROM posts p
JOIN communities c ON c.id = p.community_id
ORDER BY p.likes_count DESC
LIMIT 10;
```

## 📚 Recursos

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## 🆘 Troubleshooting

### Erro: "Failed to fetch"

Verifique se as variáveis de ambiente estão corretas no `.env.local`.

### Erro: "JWT expired"

Execute no SQL Editor:
```sql
SELECT auth.jwt();
```

Se retornar erro, recrie o projeto ou atualize a senha do banco.

### Erro: "permission denied for table"

Verifique se as políticas de RLS estão ativas:
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

## ✅ Checklist de Setup

- [ ] Projeto criado no Supabase
- [ ] Variáveis de ambiente configuradas
- [ ] Migrations executadas
- [ ] Tabelas criadas e visíveis
- [ ] RLS ativado em todas as tabelas
- [ ] Autenticação configurada
- [ ] Storage configurado (opcional)
- [ ] Realtime ativado (opcional)
- [ ] Projeto rodando localmente
- [ ] Primeiro usuário criado com sucesso

---

✨ **Setup completo! Agora você está pronto para desenvolver no Sippe.**

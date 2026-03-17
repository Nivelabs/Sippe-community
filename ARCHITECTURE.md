# 🏗️ Arquitetura do Projeto Sippe

Este documento descreve a arquitetura implementada no projeto Sippe, seguindo as melhores práticas de Next.js 15, React Server Components e Supabase.

## 📐 Visão Geral

A arquitetura segue o padrão de **camadas** (Layered Architecture), separando responsabilidades em:

```
┌─────────────────────────────────────┐
│      Presentation Layer             │  ← UI Components
│  (Pages, Components, Client Hooks)  │
├─────────────────────────────────────┤
│      Business Logic Layer           │  ← Repositories, Schemas
│   (Data Access, Validation)         │
├─────────────────────────────────────┤
│      Data Layer                     │  ← Supabase (PostgreSQL)
│   (Database, Storage, Auth)         │
└─────────────────────────────────────┘
```

## 🎯 Princípios Arquiteturais

### 1. **Separation of Concerns**
- Componentes UI não acessam diretamente o banco
- Repositories encapsulam toda lógica de acesso a dados
- Schemas Zod validam dados antes de persistir

### 2. **Server-First**
- Preferência por Server Components
- Client Components apenas quando necessário (interatividade)
- Dados buscados no servidor sempre que possível

### 3. **Type Safety**
- TypeScript strict mode
- Tipos gerados automaticamente do schema do banco
- Validação runtime com Zod

### 4. **Security by Default**
- Row Level Security (RLS) em todas as tabelas
- Autenticação via Supabase
- Middleware para refresh automático de sessão

---

## 📂 Estrutura de Camadas

### **1. Presentation Layer** (`src/app`, `src/components`)

#### Server Components (Padrão)
Componentes que rodam no servidor, sem JavaScript no cliente:

```tsx
// src/app/discover/page.tsx
import { CommunityRepository } from '@/lib/repositories/communities';

export default async function DiscoverPage() {
  // Busca dados no servidor
  const { data } = await CommunityRepository.getAll();

  // Renderiza sem JS no cliente
  return <CommunitiesList communities={data} />;
}
```

**Vantagens:**
- Sem bundle JavaScript adicional
- Acesso direto ao banco de dados
- SEO otimizado

#### Client Components (`"use client"`)
Componentes com interatividade:

```tsx
// src/components/community/LikeButton.tsx
'use client';

import { usePostLike } from '@/lib/hooks/usePosts';

export default function LikeButton({ postId }: { postId: string }) {
  const { liked, likesCount, toggleLike } = usePostLike(postId);

  return (
    <button onClick={toggleLike}>
      {liked ? '❤️' : '🤍'} {likesCount}
    </button>
  );
}
```

**Quando usar:**
- Interatividade (onClick, onChange, etc.)
- Hooks do React (useState, useEffect)
- Realtime subscriptions

### **2. Business Logic Layer** (`src/lib`)

#### Repositories
Abstraem acesso ao banco de dados:

```tsx
// src/lib/repositories/communities.ts
export class CommunityRepository {
  static async getBySlug(slug: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('communities')
      .select('*, owner:profiles(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  }

  // Outros métodos...
}
```

**Vantagens:**
- Centraliza lógica de dados
- Facilita testes
- Reutilizável em toda aplicação

#### Schemas (Validação)
Validam dados com Zod:

```tsx
// src/lib/schemas/post.ts
export const createPostSchema = z.object({
  community_id: z.string().uuid(),
  content: z.string().min(1).max(5000),
  image_url: z.string().url().optional(),
});
```

**Uso:**
```tsx
const validated = createPostSchema.parse(userInput);
await PostRepository.create(validated, userId);
```

#### Custom Hooks
Encapsulam lógica reutilizável:

```tsx
// src/lib/hooks/usePosts.ts
export function usePosts(communityId: string) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Busca posts
    // Subscreve a mudanças em tempo real
  }, [communityId]);

  return { posts, loading, error };
}
```

### **3. Data Layer** (Supabase)

#### Supabase Clients

**Client-side** (`src/lib/supabase/client.ts`):
```tsx
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(url, anonKey);
}
```

**Server-side** (`src/lib/supabase/server.ts`):
```tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: { /* gestão de cookies */ }
  });
}
```

---

## 🔄 Fluxo de Dados

### Fluxo de Leitura (Server Component)

```
1. User Request
   ↓
2. Server Component (src/app/c/[slug]/page.tsx)
   ↓
3. Repository (CommunityRepository.getBySlug)
   ↓
4. Supabase Client (createClient - server)
   ↓
5. Database Query (SELECT * FROM communities)
   ↓
6. RLS Policy Check (SELECT policy)
   ↓
7. Return Data
   ↓
8. Render HTML
```

### Fluxo de Escrita (Client Component + Server Action)

```
1. User Interaction (onClick)
   ↓
2. Client Component (LikeButton)
   ↓
3. Custom Hook (usePostLike)
   ↓
4. Supabase Client (createClient - client)
   ↓
5. Database Mutation (INSERT INTO post_likes)
   ↓
6. RLS Policy Check (INSERT policy)
   ↓
7. Trigger Execution (update_post_likes_count)
   ↓
8. Realtime Notification
   ↓
9. UI Update (setState)
```

---

## 🔐 Segurança

### Row Level Security (RLS)

Todas as tabelas possuem políticas de segurança:

```sql
-- Exemplo: Posts
CREATE POLICY "Users can create posts in their communities"
ON posts FOR INSERT
WITH CHECK (
  auth.uid() = author_id AND
  EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = posts.community_id
    AND user_id = auth.uid()
  )
);
```

### Autenticação

```
┌─────────────┐
│   Request   │
│ (browser)   │
└──────┬──────┘
       │
       ↓
┌──────────────────┐
│   Middleware     │  ← Verifica auth token
│ (src/middleware) │  ← Refresh session
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│  Server/Client   │  ← auth.getUser()
│   Component      │  ← Acessa user.id
└──────────────────┘
```

---

## ⚡ Performance

### 1. **Server Components**
- Reduz bundle JavaScript
- Dados buscados no servidor
- Streaming HTML

### 2. **Realtime Subscriptions**
```tsx
// Subscription automática em hooks
const channel = supabase
  .channel(`posts:${communityId}`)
  .on('postgres_changes', { table: 'posts' }, () => {
    refetch();
  })
  .subscribe();
```

### 3. **Database Indexes**
```sql
CREATE INDEX idx_posts_community ON posts(community_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
```

### 4. **Triggers Automáticos**
Atualizam contadores sem queries extras:
```sql
CREATE TRIGGER post_likes_count_trigger
AFTER INSERT OR DELETE ON post_likes
FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();
```

---

## 🧩 Padrões de Código

### 1. **Repository Pattern**
✅ **Recomendado:**
```tsx
const community = await CommunityRepository.getBySlug(slug);
```

❌ **Evitar:**
```tsx
const { data } = await supabase
  .from('communities')
  .select('*')
  .eq('slug', slug)
  .single();
```

### 2. **Validation Pattern**
✅ **Recomendado:**
```tsx
const validated = createPostSchema.parse(input);
await PostRepository.create(validated, userId);
```

❌ **Evitar:**
```tsx
await supabase.from('posts').insert(input); // Sem validação!
```

### 3. **Error Handling**
✅ **Recomendado:**
```tsx
try {
  const data = await Repository.get(id);
  if (!data) return notFound();
  return <Component data={data} />;
} catch (error) {
  return <ErrorComponent error={error} />;
}
```

### 4. **Type Safety**
✅ **Recomendado:**
```tsx
import type { Database } from '@/types/database';

type Community = Database['public']['Tables']['communities']['Row'];
```

---

## 📊 Database Schema Design

### Principais Decisões

#### 1. **Normalização**
- Dados separados em tabelas relacionadas
- Evita duplicação
- Facilita updates

#### 2. **Denormalização Controlada**
- Contadores (likes_count, member_count)
- Atualizados via triggers
- Melhora performance de leitura

#### 3. **Soft Deletes vs Hard Deletes**
- Hard deletes (CASCADE)
- Simplicidade > Auditoria (por enquanto)

#### 4. **UUIDs vs Integers**
- UUIDs para IDs
- Segurança (não enumerable)
- Distribuição (sharding futuro)

---

## 🔮 Futuras Melhorias

### Fase 1: Performance
- [ ] Redis para caching
- [ ] CDN para assets
- [ ] Lazy loading de componentes
- [ ] Pagination infinita

### Fase 2: Features
- [ ] Upload de arquivos (Storage)
- [ ] Notificações em tempo real
- [ ] Sistema de busca (full-text)
- [ ] Analytics dashboard

### Fase 3: Escalabilidade
- [ ] Background jobs (Supabase Functions)
- [ ] Rate limiting
- [ ] Sharding do banco
- [ ] Microservices (se necessário)

---

## 📚 Referências

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Supabase Docs](https://supabase.com/docs)
- [Layered Architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html)

---

✨ **Arquitetura criada para ser simples, segura e escalável.**

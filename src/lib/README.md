# 📚 Library Documentation - Sippe

Esta pasta contém toda a lógica de negócio e utilitários do projeto.

## 🗂️ Estrutura

```
src/lib/
├── supabase/           # Clientes Supabase
│   ├── client.ts       # Cliente para browser (Client Components)
│   ├── server.ts       # Cliente para servidor (Server Components/API)
│   └── middleware.ts   # Cliente para middleware
│
├── repositories/       # Camada de acesso a dados
│   ├── communities.ts  # CRUD de comunidades
│   ├── posts.ts        # CRUD de posts e comentários
│   └── users.ts        # CRUD de usuários
│
├── schemas/            # Validação com Zod
│   ├── community.ts    # Schemas de comunidades
│   ├── post.ts         # Schemas de posts
│   └── user.ts         # Schemas de usuários
│
├── hooks/              # Custom React Hooks
│   ├── useAuth.ts      # Hook de autenticação
│   ├── useCommunity.ts # Hook de comunidades
│   └── usePosts.ts     # Hook de posts
│
├── utils.ts            # Utilitários gerais
└── mock-data.ts        # Dados mockados (remover em produção)
```

## 🔌 Supabase Clients

### Client-side (Browser)

Use em **Client Components** (`"use client"`):

```tsx
import { createClient } from '@/lib/supabase/client';

export default function MyClientComponent() {
  const supabase = createClient();

  // Use o supabase aqui
}
```

### Server-side (Server Components/API)

Use em **Server Components** e **API Routes**:

```tsx
import { createClient } from '@/lib/supabase/server';

export default async function MyServerComponent() {
  const supabase = await createClient();

  // Use o supabase aqui
}
```

### Middleware

Já configurado em `src/middleware.ts` - não precisa modificar.

## 🗄️ Repositories

Os repositories são a camada de acesso a dados. Use-os ao invés de chamar o Supabase diretamente.

### CommunityRepository

```tsx
import { CommunityRepository } from '@/lib/repositories/communities';

// Buscar todas as comunidades
const { data, count } = await CommunityRepository.getAll({
  page: 1,
  limit: 12,
  category: 'Tecnologia',
});

// Buscar por slug
const community = await CommunityRepository.getBySlug('ai-builders');

// Criar comunidade
const newCommunity = await CommunityRepository.create(
  {
    name: 'Minha Comunidade',
    slug: 'minha-comunidade',
    description: 'Descrição...',
    category: 'Tecnologia',
    price: 49,
  },
  userId
);

// Entrar na comunidade
await CommunityRepository.join(communityId, userId);

// Sair da comunidade
await CommunityRepository.leave(communityId, userId);

// Verificar se é membro
const isMember = await CommunityRepository.isMember(communityId, userId);

// Buscar membros
const members = await CommunityRepository.getMembers(communityId);
```

### PostRepository

```tsx
import { PostRepository } from '@/lib/repositories/posts';

// Buscar posts de uma comunidade
const posts = await PostRepository.getByCommunity(communityId, userId, {
  page: 1,
  limit: 20,
});

// Criar post
const newPost = await PostRepository.create(
  {
    community_id: communityId,
    content: 'Meu post...',
    image_url: 'https://...',
  },
  authorId
);

// Curtir post
await PostRepository.like(postId, userId);

// Descurtir post
await PostRepository.unlike(postId, userId);

// Buscar comentários
const comments = await PostRepository.getComments(postId);

// Criar comentário
await PostRepository.createComment(
  {
    post_id: postId,
    content: 'Meu comentário...',
  },
  authorId
);
```

### UserRepository

```tsx
import { UserRepository } from '@/lib/repositories/users';

// Buscar perfil por ID
const profile = await UserRepository.getById(userId);

// Buscar por username
const profile = await UserRepository.getByUsername('johndoe');

// Atualizar perfil
await UserRepository.update(userId, {
  full_name: 'John Doe',
  bio: 'Desenvolvedor...',
  website: 'https://johndoe.com',
});

// Buscar comunidades do usuário
const communities = await UserRepository.getCommunities(userId);
```

## ✅ Validação com Zod

Sempre valide os dados antes de enviar ao banco:

```tsx
import { createPostSchema } from '@/lib/schemas/post';

// Validar dados
const validatedData = createPostSchema.parse({
  community_id: 'uuid-here',
  content: 'Meu post...',
  image_url: 'https://...',
});

// Ou com error handling
const result = createPostSchema.safeParse(data);

if (!result.success) {
  console.error(result.error.errors);
  return;
}

// Criar post com dados validados
await PostRepository.create(result.data, userId);
```

## 🎣 Custom Hooks

### useAuth

Hook para autenticação:

```tsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';

export default function MyComponent() {
  const { user, loading, isAuthenticated, signOut } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return <div>Faça login</div>;
  }

  return (
    <div>
      <p>Olá, {user.email}</p>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}
```

### useCommunity

Hook para buscar dados de uma comunidade:

```tsx
'use client';

import { useCommunity } from '@/lib/hooks/useCommunity';

export default function CommunityPage({ slug }: { slug: string }) {
  const { community, loading, error } = useCommunity(slug);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  if (!community) return <div>Comunidade não encontrada</div>;

  return <h1>{community.name}</h1>;
}
```

### useIsMember

Hook para verificar se usuário é membro:

```tsx
'use client';

import { useIsMember } from '@/lib/hooks/useCommunity';
import { useAuth } from '@/lib/hooks/useAuth';

export default function JoinButton({ communityId }: { communityId: string }) {
  const { user } = useAuth();
  const { isMember, loading, joinCommunity, leaveCommunity } = useIsMember(
    communityId,
    user?.id
  );

  if (loading) return <div>Carregando...</div>;

  return (
    <button onClick={isMember ? leaveCommunity : joinCommunity}>
      {isMember ? 'Sair' : 'Entrar'}
    </button>
  );
}
```

### usePosts

Hook para buscar posts com realtime:

```tsx
'use client';

import { usePosts } from '@/lib/hooks/usePosts';
import { useAuth } from '@/lib/hooks/useAuth';

export default function PostFeed({ communityId }: { communityId: string }) {
  const { user } = useAuth();
  const { posts, loading, error } = usePosts(communityId, user?.id);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <p>Curtidas: {post.likes_count}</p>
          {post.user_has_liked && <span>❤️</span>}
        </div>
      ))}
    </div>
  );
}
```

### usePostLike

Hook para curtir/descurtir posts:

```tsx
'use client';

import { usePostLike } from '@/lib/hooks/usePosts';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LikeButton({ postId }: { postId: string }) {
  const { user } = useAuth();
  const { liked, likesCount, toggleLike } = usePostLike(postId, user?.id);

  return (
    <button onClick={toggleLike}>
      {liked ? '❤️' : '🤍'} {likesCount}
    </button>
  );
}
```

## 🔒 Autenticação

### Login com Email/Senha

```tsx
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Signup
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      full_name: 'John Doe',
    },
  },
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Logout
await supabase.auth.signOut();
```

### Login com OAuth (Google)

```tsx
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

## 🚨 Error Handling

Sempre use try/catch ao chamar repositories:

```tsx
try {
  const community = await CommunityRepository.getBySlug(slug);

  if (!community) {
    return <div>Comunidade não encontrada</div>;
  }

  // Render community...
} catch (error) {
  console.error('Erro ao buscar comunidade:', error);
  return <div>Erro ao carregar comunidade</div>;
}
```

## 🎯 Boas Práticas

1. **Use Repositories**: Nunca chame Supabase diretamente nos componentes
2. **Valide com Zod**: Sempre valide dados antes de enviar ao banco
3. **Use Hooks**: Prefira hooks customizados para lógica reutilizável
4. **Server vs Client**: Use Server Components quando possível
5. **Error Handling**: Sempre trate erros adequadamente
6. **TypeScript**: Aproveite os tipos gerados do banco de dados

## 📖 Exemplos Completos

### Criar uma Nova Comunidade (Server Action)

```tsx
'use server';

import { createCommunitySchema } from '@/lib/schemas/community';
import { CommunityRepository } from '@/lib/repositories/communities';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createCommunityAction(formData: FormData) {
  const supabase = await createClient();

  // Verificar autenticação
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado');

  // Validar dados
  const validated = createCommunitySchema.parse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    category: formData.get('category'),
    price: Number(formData.get('price')),
  });

  // Criar comunidade
  const community = await CommunityRepository.create(validated, user.id);

  // Revalidar cache
  revalidatePath('/discover');

  return { success: true, community };
}
```

### Exibir Posts com Realtime

```tsx
'use client';

import { usePosts } from '@/lib/hooks/usePosts';
import { useAuth } from '@/lib/hooks/useAuth';
import { usePostLike } from '@/lib/hooks/usePosts';

function LikeButton({ postId }: { postId: string }) {
  const { user } = useAuth();
  const { liked, likesCount, toggleLike } = usePostLike(postId, user?.id);

  return (
    <button onClick={toggleLike} className="flex items-center gap-1">
      {liked ? '❤️' : '🤍'} {likesCount}
    </button>
  );
}

export default function PostFeed({ communityId }: { communityId: string }) {
  const { user } = useAuth();
  const { posts, loading, error } = usePosts(communityId, user?.id);

  if (loading) return <div>Carregando posts...</div>;
  if (error) return <div>Erro ao carregar posts</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.author.avatar_url || '/default-avatar.png'}
              alt={post.author.full_name || 'User'}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold">
              {post.author.full_name || 'Anônimo'}
            </span>
          </div>
          <p>{post.content}</p>
          {post.image_url && (
            <img src={post.image_url} alt="" className="mt-2 rounded-lg" />
          )}
          <div className="flex items-center gap-4 mt-3">
            <LikeButton postId={post.id} />
            <span>{post.comments_count} comentários</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

💡 **Dica**: Consulte sempre os tipos TypeScript para ver todas as propriedades disponíveis!

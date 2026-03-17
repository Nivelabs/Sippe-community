# 🚀 Sippe - Plataforma de Comunidades Online

> Construa, gerencie e monetize comunidades incríveis. Uma alternativa moderna ao Skool, feita no Brasil.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.0-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)

</div>

---

## ✨ Funcionalidades

- 🏘️ **Comunidades** - Crie e gerencie comunidades públicas ou privadas
- 📝 **Posts & Feed** - Sistema completo de posts com curtidas e comentários
- 📚 **Cursos** - Crie e venda cursos diretamente na plataforma
- 📅 **Eventos** - Organize lives, webinars e meetups presenciais
- 🏆 **Gamificação** - Sistema de pontos, níveis e leaderboard
- 💰 **Monetização** - Assinaturas mensais, cursos pagos e eventos
- ⚡ **Realtime** - Atualizações em tempo real com Supabase
- 🔐 **Autenticação** - Login com email/senha e OAuth (Google, GitHub)
- 📱 **Responsivo** - Interface mobile-first com Tailwind CSS

---

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 15.5** - React framework com App Router e Server Components
- **React 19** - Biblioteca UI com React Server Components
- **TypeScript 5** - Tipagem estática e IntelliSense
- **Tailwind CSS 4** - Estilização utility-first
- **shadcn/ui** - Componentes UI acessíveis e customizáveis
- **Lucide React** - Ícones modernos

### Backend
- **Supabase** - PostgreSQL, autenticação, storage e realtime
- **Zod** - Validação de schemas TypeScript-first
- **@supabase/ssr** - Server-side rendering com Supabase

### Ferramentas
- **Turbopack** - Bundler ultrarrápido do Next.js
- **ESLint** - Linting e code quality
- **PostCSS** - Processamento de CSS

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta no [Supabase](https://supabase.com) (gratuita)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/sippe-community.git
cd sippe-community
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Supabase

Siga o guia completo: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

**TL;DR:**
1. Crie um projeto no Supabase
2. Copie as credenciais
3. Renomeie `.env.example` para `.env.local`
4. Preencha as variáveis de ambiente
5. Execute as migrations SQL

```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais
```

### 4. Execute o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📁 Estrutura do Projeto

```
sippe-community/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── (auth)/            # Rotas de autenticação
│   │   ├── (marketing)/       # Landing page
│   │   ├── c/[slug]/          # Páginas de comunidades
│   │   ├── discover/          # Descobrir comunidades
│   │   └── layout.tsx         # Layout raiz
│   │
│   ├── components/
│   │   ├── ui/                # Componentes shadcn/ui
│   │   ├── features/          # Componentes por feature
│   │   ├── layout/            # Navbar, Footer
│   │   └── landing/           # Componentes da landing
│   │
│   ├── lib/
│   │   ├── supabase/          # Clientes Supabase
│   │   ├── repositories/      # Camada de dados
│   │   ├── schemas/           # Validação Zod
│   │   ├── hooks/             # Custom React Hooks
│   │   └── utils.ts           # Utilitários
│   │
│   └── types/
│       └── database.ts        # Tipos TypeScript do DB
│
├── supabase/
│   └── migrations/            # SQL migrations
│
├── public/                    # Assets estáticos
└── docs/                      # Documentação
```

---

## 🗄️ Banco de Dados

### Schema Principal

```
profiles               → Perfis de usuários
├── communities        → Comunidades
│   ├── community_members → Membros
│   ├── posts         → Posts
│   │   ├── post_likes → Curtidas
│   │   └── comments  → Comentários
│   ├── courses       → Cursos
│   │   └── lessons   → Aulas
│   ├── events        → Eventos
│   │   └── event_attendees → Participantes
│   └── tags          → Tags
```

### Principais Features

- ✅ Row Level Security (RLS) em todas as tabelas
- ✅ Triggers automáticos (contadores, timestamps)
- ✅ Índices otimizados para performance
- ✅ Relacionamentos com foreign keys
- ✅ Políticas de acesso granular

Ver schema completo: [supabase/migrations/20260314000000_initial_schema.sql](./supabase/migrations/20260314000000_initial_schema.sql)

---

## 🎯 Como Usar

### Criar uma Comunidade (Server Action)

```tsx
'use server';

import { createCommunitySchema } from '@/lib/schemas/community';
import { CommunityRepository } from '@/lib/repositories/communities';

export async function createCommunity(formData: FormData) {
  const validated = createCommunitySchema.parse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    category: formData.get('category'),
  });

  const community = await CommunityRepository.create(validated, userId);
  return community;
}
```

### Exibir Posts com Realtime

```tsx
'use client';

import { usePosts } from '@/lib/hooks/usePosts';

export default function PostFeed({ communityId }) {
  const { posts, loading } = usePosts(communityId);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <span>{post.likes_count} curtidas</span>
        </div>
      ))}
    </div>
  );
}
```

Ver mais exemplos: **[src/lib/README.md](./src/lib/README.md)**

---

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy automático! 🎉

### Variáveis de Ambiente de Produção

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_APP_URL=https://sippe.com.br
```

⚠️ **Nunca** commite `.env.local` no Git!

---

## 🧪 Testes

```bash
# Rodar testes (em breve)
npm test

# Rodar testes em modo watch
npm test:watch

# Coverage
npm test:coverage
```

---

## 📚 Documentação

- 📖 [Guia de Setup do Supabase](./SUPABASE_SETUP.md)
- 📖 [Documentação da Lib](./src/lib/README.md)
- 📖 [Arquitetura do Projeto](./docs/ARCHITECTURE.md) *(em breve)*
- 📖 [Guia de Contribuição](./CONTRIBUTING.md) *(em breve)*

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Roda ESLint
```

---

## 🐛 Troubleshooting

### Erro de conexão com Supabase

Verifique se as variáveis de ambiente estão corretas no `.env.local`.

### Erro "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build falha no Vercel

Verifique se todas as variáveis de ambiente estão configuradas no dashboard do Vercel.

---

## 📄 Licença

Este projeto está sob a licença MIT. Ver arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Nathan Nisaac**

- GitHub: [@nathannisaac](https://github.com/nathannisaac)

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- Comunidade open-source ❤️

---

<div align="center">

**[⬆ Voltar ao topo](#-sippe---plataforma-de-comunidades-online)**

Feito com ❤️ no Brasil 🇧🇷

</div>

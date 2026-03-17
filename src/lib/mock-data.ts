// Shared mock data types and data for the Sippe Community app

// Type definitions
export type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  members: number;
  online: number;
  price: number;
  owner: string;
  ownerAvatar: string;
  avatar: string;
  cover: string;
  tags: string[];
  featured: boolean;
  rating: number;
  rank: number;
};

export type Post = {
  id: string;
  author: string;
  authorAvatar: string;
  role: string;
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  time: string;
  pinned: boolean;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  cover: string;
  lessons: number;
  duration: string;
  free: boolean;
  progress: number;
};

export type Member = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  points: number;
  level: number;
  bio: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  attendees: number;
  type: string;
  cover: string;
};

export const CATEGORIES = [
  "Todos",
  "Tecnologia",
  "Design",
  "Marketing",
  "Negócios",
  "Educação",
  "Saúde",
  "Arte",
  "Esportes",
  "Música",
];

export const COMMUNITIES = [
  {
    id: "1",
    slug: "ai-builders-club",
    name: "AI Builders Club",
    description:
      "Comunidade para construtores de IA, ML e tecnologia. Aprenda, conecte e cresça.",
    category: "Tecnologia",
    members: 12300,
    online: 247,
    price: 0,
    owner: "Lucas Mendes",
    ownerAvatar: "https://i.pravatar.cc/40?u=lucas-mendes",
    avatar: "https://picsum.photos/seed/ai-builders/100/100",
    cover: "https://picsum.photos/seed/ai-builders-cover/1200/300",
    tags: ["IA", "Machine Learning", "Python", "LLMs"],
    featured: true,
    rating: 4.9,
    rank: 1,
  },
  {
    id: "2",
    slug: "growth-hackers-brasil",
    name: "Growth Hackers Brasil",
    description:
      "Comunidade de growth marketing com estratégias práticas de crescimento escalável.",
    category: "Marketing",
    members: 8700,
    online: 182,
    price: 97,
    owner: "Fernanda Lima",
    ownerAvatar: "https://i.pravatar.cc/40?u=fernanda-lima",
    avatar: "https://picsum.photos/seed/growth/100/100",
    cover: "https://picsum.photos/seed/growth-cover/1200/300",
    tags: ["Marketing", "Growth", "SEO", "Funil"],
    featured: true,
    rating: 4.8,
    rank: 2,
  },
  {
    id: "3",
    slug: "designers-unidos",
    name: "Designers Unidos",
    description:
      "Para designers UX/UI que querem se conectar, aprender e crescer juntos.",
    category: "Design",
    members: 5400,
    online: 98,
    price: 49,
    owner: "Beatriz Santos",
    ownerAvatar: "https://i.pravatar.cc/40?u=beatriz-santos",
    avatar: "https://picsum.photos/seed/design/100/100",
    cover: "https://picsum.photos/seed/design-cover/1200/300",
    tags: ["UX", "UI", "Figma", "Design System"],
    featured: false,
    rating: 4.7,
    rank: 3,
  },
  {
    id: "4",
    slug: "empreendedores-digitais",
    name: "Empreendedores Digitais",
    description:
      "Negócios online, infoprodutos e liberade financeira. Comunidade para quem quer viver do digital.",
    category: "Negócios",
    members: 32000,
    online: 540,
    price: 0,
    owner: "Rafael Torres",
    ownerAvatar: "https://i.pravatar.cc/40?u=rafael-torres",
    avatar: "https://picsum.photos/seed/empreend/100/100",
    cover: "https://picsum.photos/seed/empreend-cover/1200/300",
    tags: ["Infoproduto", "Negócios", "Finanças", "Digital"],
    featured: true,
    rating: 4.9,
    rank: 4,
  },
  {
    id: "5",
    slug: "dev-fullstack-brasil",
    name: "Dev Fullstack Brasil",
    description:
      "React, Node, Next.js e TypeScript. Aprenda fullstack do zero ao avançado.",
    category: "Tecnologia",
    members: 18500,
    online: 310,
    price: 79,
    owner: "Carlos Oliveira",
    ownerAvatar: "https://i.pravatar.cc/40?u=carlos-oliveira",
    avatar: "https://picsum.photos/seed/devfull/100/100",
    cover: "https://picsum.photos/seed/devfull-cover/1200/300",
    tags: ["React", "Node", "TypeScript", "Fullstack"],
    featured: false,
    rating: 4.8,
    rank: 5,
  },
  {
    id: "6",
    slug: "fitness-e-saude",
    name: "Fitness & Saúde",
    description:
      "Treinos, nutrição e bem-estar para uma vida mais saudável e equilibrada.",
    category: "Saúde",
    members: 9200,
    online: 143,
    price: 0,
    owner: "Ana Rodrigues",
    ownerAvatar: "https://i.pravatar.cc/40?u=ana-rodrigues",
    avatar: "https://picsum.photos/seed/fitness/100/100",
    cover: "https://picsum.photos/seed/fitness-cover/1200/300",
    tags: ["Saúde", "Treino", "Nutrição", "Bem-estar"],
    featured: false,
    rating: 4.6,
    rank: 6,
  },
];

export const POSTS = [
  {
    id: "1",
    author: "Lucas Mendes",
    authorAvatar: "https://i.pravatar.cc/40?u=lucas-mendes",
    role: "Admin",
    content:
      "🚀 Novo módulo sobre fine-tuning de LLMs disponível! Aprenda como treinar seu próprio modelo com dados proprietários. O módulo cobre desde a preparação do dataset até o deploy em produção.",
    image: "https://picsum.photos/seed/post-llm/600/300",
    likes: 142,
    comments: 38,
    time: "2h atrás",
    pinned: true,
  },
  {
    id: "2",
    author: "Mariana Silva",
    authorAvatar: "https://i.pravatar.cc/40?u=mariana-silva",
    role: "Membro",
    content:
      "Consegui integrar GPT-4 no meu app em 30 minutos usando a Vercel AI SDK! A documentação tá incrível. Alguém mais testou? Está rodando muito melhor do que eu esperava na produção.",
    image: null,
    likes: 89,
    comments: 24,
    time: "5h atrás",
    pinned: false,
  },
  {
    id: "3",
    author: "Pedro Costa",
    authorAvatar: "https://i.pravatar.cc/40?u=pedro-costa",
    role: "Moderador",
    content:
      "Compartilho aqui minha jornada: há 6 meses não sabia nada de IA. Hoje já tenho 3 projetos em produção e um produto SaaS. O que mudou? Foco, prática e uma comunidade incrível como essa!",
    image: null,
    likes: 234,
    comments: 67,
    time: "1d atrás",
    pinned: false,
  },
];

export const COURSES = [
  {
    id: "1",
    title: "LLMs na Prática: Do Zero ao Deploy",
    description: "Aprenda a criar, afinar e distribuir modelos de linguagem em produção.",
    cover: "https://picsum.photos/seed/course-llm/400/200",
    lessons: 42,
    duration: "18h",
    free: false,
    progress: 65,
  },
  {
    id: "2",
    title: "Python para IA: Fundamentos",
    description: "Todas as bases de Python que você precisa para trabalhar com IA.",
    cover: "https://picsum.photos/seed/course-python/400/200",
    lessons: 28,
    duration: "12h",
    free: true,
    progress: 100,
  },
  {
    id: "3",
    title: "RAG e Vector Databases",
    description: "Construa sistemas de busca semântica com embeddings e RAG.",
    cover: "https://picsum.photos/seed/course-rag/400/200",
    lessons: 18,
    duration: "8h",
    free: false,
    progress: 0,
  },
  {
    id: "4",
    title: "Agentes de IA com LangChain",
    description: "Crie agentes autônomos capazes de executar tarefas complexas.",
    cover: "https://picsum.photos/seed/course-agents/400/200",
    lessons: 24,
    duration: "10h",
    free: false,
    progress: 20,
  },
];

export const MEMBERS = [
  {
    id: "1",
    name: "Lucas Mendes",
    avatar: "https://i.pravatar.cc/40?u=lucas-mendes",
    role: "Admin",
    points: 9850,
    level: 42,
    bio: "Fundador da AI Builders Club. Engenheiro de ML com 8 anos de experiência.",
  },
  {
    id: "2",
    name: "Mariana Silva",
    avatar: "https://i.pravatar.cc/40?u=mariana-silva",
    role: "Moderador",
    points: 7200,
    level: 35,
    bio: "Desenvolvedora Full Stack apaixonada por IA aplicada a produtos.",
  },
  {
    id: "3",
    name: "Pedro Costa",
    avatar: "https://i.pravatar.cc/40?u=pedro-costa",
    role: "Moderador",
    points: 6100,
    level: 31,
    bio: "Empreendedor e criador de produto. Construindo em público.",
  },
  {
    id: "4",
    name: "Ana Rodrigues",
    avatar: "https://i.pravatar.cc/40?u=ana-rodrigues",
    role: "Membro",
    points: 4800,
    level: 24,
    bio: "Data Scientist e instrutora de Python para IA.",
  },
  {
    id: "5",
    name: "Carlos Oliveira",
    avatar: "https://i.pravatar.cc/40?u=carlos-oliveira",
    role: "Membro",
    points: 3200,
    level: 18,
    bio: "Desenvolvedor Backend especializado em APIs e MLOps.",
  },
  {
    id: "6",
    name: "Beatriz Santos",
    avatar: "https://i.pravatar.cc/40?u=beatriz-santos",
    role: "Membro",
    points: 2900,
    level: 15,
    bio: "Product Designer com foco em experiências baseadas em dados.",
  },
];

export const EVENTS = [
  {
    id: "1",
    title: "Workshop: Fine-tuning GPT-4 com dados proprietários",
    description: "Aprenda na prática como ajustar modelos para seu domínio específico.",
    date: "28 Mar",
    time: "19h00",
    attendees: 312,
    type: "online",
    cover: "https://picsum.photos/seed/event-gpt/400/200",
  },
  {
    id: "2",
    title: "Meetup AI Builders São Paulo",
    description: "Encontro presencial com apresentações, networking e pizza.",
    date: "5 Abr",
    time: "15h00",
    attendees: 87,
    type: "presencial",
    cover: "https://picsum.photos/seed/event-meetup/400/200",
  },
  {
    id: "3",
    title: "Hackathon: Construindo com LLMs",
    description: "48h para criar o produto mais incrível usando modelos de linguagem.",
    date: "12 Abr",
    time: "09h00",
    attendees: 156,
    type: "online",
    cover: "https://picsum.photos/seed/event-hack/400/200",
  },
];

// Current user mock data
export const CURRENT_USER = {
  id: "current-user",
  name: "Você",
  fullName: "Nathan Isaac",
  username: "nathanisaac",
  avatar: "https://i.pravatar.cc/80?u=current-user-sippe",
  bio: "Criador de comunidades e entusiasta de tecnologia. Construindo o futuro do aprendizado online. 🚀",
  location: "São Paulo, Brasil",
  website: "nathanisaac.com",
  joinedDate: "Janeiro 2024",
  followers: 1248,
  following: 342,
  communities: 3,
  courses: 8,
  level: 24,
  points: 4850,
  streak: 14,
  myCommunities: [
    {
      id: "my-1",
      slug: "ai-builders-club",
      name: "AI Builders Club",
      avatar: "https://picsum.photos/seed/ai-builders/100/100",
      members: 12300,
      role: "Membro",
      unread: 5,
    },
    {
      id: "my-2",
      slug: "empreendedores-digitais",
      name: "Empreendedores Digitais",
      avatar: "https://picsum.photos/seed/empreend/100/100",
      members: 32000,
      role: "Moderador",
      unread: 0,
    },
    {
      id: "my-3",
      slug: "dev-fullstack-brasil",
      name: "Dev Fullstack Brasil",
      avatar: "https://picsum.photos/seed/devfull/100/100",
      members: 18500,
      role: "Membro",
      unread: 12,
    },
  ],
};

// Features for landing page
export const FEATURES = [
  {
    icon: "users",
    title: "Comunidade",
    description:
      "Feed de posts, comentários, reações e threads. Crie conexões reais entre seus membros.",
  },
  {
    icon: "book-open",
    title: "Cursos",
    description:
      "Crie e venda cursos completos com vídeos, PDFs e quizzes. Tudo integrado na sua comunidade.",
  },
  {
    icon: "calendar",
    title: "Eventos",
    description:
      "Organize lives, webinars e meetups. Integração nativa com Zoom e Google Meet.",
  },
  {
    icon: "trophy",
    title: "Gamificação",
    description:
      "Pontos, badges, níveis e leaderboard. Mantenha seus membros engajados e voltando sempre.",
  },
  {
    icon: "credit-card",
    title: "Monetização",
    description:
      "Planos de assinatura, vendas avulsas e cupons de desconto. Receba direto na sua conta.",
  },
  {
    icon: "bar-chart",
    title: "Analytics",
    description:
      "Dashboards com crescimento de membros, engajamento e receita em tempo real.",
  },
];

// Pricing plans for landing page
export const PRICING_PLANS = [
  {
    id: "free",
    name: "Grátis",
    price: 0,
    description: "Para começar sua jornada",
    features: [
      "1 comunidade",
      "Até 100 membros",
      "Feed de posts",
      "1 curso gratuito",
      "Suporte por email",
    ],
    cta: "Começar grátis",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 97,
    description: "Para criadores em crescimento",
    features: [
      "Comunidades ilimitadas",
      "Membros ilimitados",
      "Cursos ilimitados",
      "Eventos ao vivo",
      "Gamificação avançada",
      "Cobranças e pagamentos",
      "Suporte prioritário",
    ],
    cta: "Começar agora",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 297,
    description: "Para grandes operações",
    features: [
      "Tudo do Pro",
      "White-label completo",
      "API personalizada",
      "Onboarding dedicado",
      "SLA garantido",
      "Gerente de conta",
      "Relatórios avançados",
    ],
    cta: "Falar com vendas",
    featured: false,
  },
];

// Testimonials for landing page
export const TESTIMONIALS = [
  {
    id: "1",
    name: "Rafael Torres",
    role: "Fundador, DevLaunch",
    avatar: "https://i.pravatar.cc/64?u=rafael-torres-t",
    quote:
      "Com o Sippe, fui de 0 a 3.200 membros em 4 meses. A plataforma é intuitiva, os membros adoram a experiência e nossa receita dobrou.",
    community: "Empreendedor Digital",
    members: 45200,
  },
  {
    id: "2",
    name: "Fernanda Lima",
    role: "Investidora & Educadora",
    avatar: "https://i.pravatar.cc/64?u=fernanda-lima-t",
    quote:
      "Nunca pensei que gerenciar uma comunidade seria tão fácil. Os cursos integrados e o sistema de gamificação mantêm meus membros engajados todo dia.",
    community: "Investidores Brasil",
    members: 31000,
  },
  {
    id: "3",
    name: "Lucas Mendes",
    role: "Engenheiro de IA",
    avatar: "https://i.pravatar.cc/64?u=lucas-mendes-t",
    quote:
      "O Sippe é o que o Skool deveria ter sido desde o início – só que em português, com suporte rápido e uma UX muito mais moderna.",
    community: "AI Builders Club",
    members: 12400,
  },
];

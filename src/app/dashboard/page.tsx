"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Compass,
  Users,
  BookOpen,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  Flame,
  Trophy,
  MessageCircle,
  Heart,
  Clock,
  ChevronRight,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { CURRENT_USER, POSTS, COMMUNITIES } from "@/lib/mock-data";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Compass, label: "Explorar", href: "/discover" },
  { icon: Users, label: "Minhas Comunidades", href: "/dashboard/communities" },
  { icon: BookOpen, label: "Meus Cursos", href: "/dashboard/courses" },
  { icon: Bell, label: "Notificações", href: "/dashboard/notifications", badge: 8 },
  { icon: Settings, label: "Configurações", href: "/settings" },
];

function SippeLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Image
        src="/logo-sippe.png"
        alt="Sippe Logo"
        width={100}
        height={32}
        className="w-auto h-8 object-contain"
        priority
      />
    </Link>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = CURRENT_USER;

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex font-sans text-[#09090b]">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-black/5 z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-black/5">
          <SippeLogo />
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-black/5 transition-colors text-[#71717a]"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all ${
                item.active
                  ? "bg-[#09090b] text-white shadow-md shadow-black/10"
                  : "text-[#71717a] hover:text-[#09090b] hover:bg-black/5"
              }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                  item.active ? "bg-white text-[#09090b]" : "bg-[#09090b] text-white"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          {/* My Communities */}
          <div className="pt-6 mt-4 border-t border-black/5">
            <p className="px-4 text-[11px] font-extrabold text-[#a1a1aa] uppercase tracking-wider mb-3">
              Suas Comunidades
            </p>
            {user.myCommunities.map((c) => (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-black/5 transition-all group"
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-8 h-8 rounded-[10px] object-cover ring-1 ring-black/5"
                  width={32}
                  height={32}
                />
                <span className="flex-1 text-[13px] font-bold text-[#71717a] group-hover:text-[#09090b] truncate transition-colors">
                  {c.name}
                </span>
                {c.unread > 0 && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                )}
              </Link>
            ))}
            <Link
              href="/create-community"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-black/5 transition-all mt-2 group"
            >
              <div className="w-8 h-8 rounded-[10px] border border-dashed border-[#d4d4d8] group-hover:border-[#09090b] flex items-center justify-center transition-colors bg-[#fafafa] group-hover:bg-white">
                <Plus className="w-4 h-4 text-[#a1a1aa] group-hover:text-[#09090b] transition-colors" />
              </div>
              <span className="text-[13px] font-bold text-[#71717a] group-hover:text-[#09090b] transition-colors">Criar comunidade</span>
            </Link>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-black/5 bg-[#fafafa]">
          <Link href="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 transition-colors group">
            <Avatar className="w-10 h-10 shrink-0 ring-1 ring-black/10">
              <AvatarImage src={user.avatar} alt={user.fullName} />
              <AvatarFallback className="text-sm font-bold bg-[#09090b] text-white">{user.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-extrabold text-[#09090b] truncate group-hover:text-black transition-colors">
                {user.fullName}
              </p>
              <p className="text-[12px] font-semibold text-[#71717a]">Plano Premium · Lvl {user.level}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-black/5 h-[72px] flex items-center px-4 lg:px-10 gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-black/5 transition-colors focus:ring-2 focus:ring-[#09090b]/20"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-[#09090b]" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-extrabold text-[#09090b] tracking-tight flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
              Visão Geral
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/create-community">
              <Button
                size="sm"
                className="hidden sm:flex rounded-full font-bold text-[13px] h-10 px-5 bg-[#09090b] text-white hover:bg-[#27272a] hover:shadow-lg hover:shadow-black/10 transition-all hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Nova Comunidade
              </Button>
            </Link>
            
            <button className="relative p-2.5 rounded-full hover:bg-black/5 transition-colors focus:ring-2 focus:ring-[#09090b]/20 bg-[#fafafa] border border-black/5">
              <Bell className="w-5 h-5 text-[#09090b]" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <Link href="/profile" className="hidden sm:block">
              <Avatar className="w-10 h-10 ring-2 ring-offset-2 ring-transparent hover:ring-black/10 transition-all cursor-pointer">
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback className="text-sm font-bold bg-[#09090b] text-white">{user.fullName[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 lg:px-10 py-8 lg:py-10 max-w-7xl mx-auto w-full">
          {/* Welcome User Row */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[#71717a] font-bold text-sm mb-1 uppercase tracking-wider">Dashboard de Criador</p>
              <h2 className="text-3xl font-extrabold text-[#09090b]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Bem-vindo de volta, {user.fullName.split(" ")[0]}! 👋
              </h2>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { label: "Membros Totais", value: "12.4k", icon: Users, color: "#09090b", bg: "#f4f4f5" },
              { label: "Cursos Ativos", value: user.courses, icon: BookOpen, color: "#09090b", bg: "#f4f4f5" },
              { label: "Pontos Engajamento", value: user.points.toLocaleString(), icon: Trophy, color: "#09090b", bg: "#f4f4f5" },
              { label: "Receita (Mês)", value: "R$ 4.2k", icon: TrendingUp, color: "#09090b", bg: "#f4f4f5" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-[24px] border border-black/5 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-black/5"
                    style={{ background: stat.bg }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-0 font-bold hover:bg-green-500/20 px-2 py-0.5 rounded-lg text-[10px]">
                    +14%
                  </Badge>
                </div>
                <p className="text-3xl font-extrabold text-[#09090b] tracking-tight mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {stat.value}
                </p>
                <p className="text-[13px] font-bold text-[#71717a]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Post composer */}
              <div className="bg-white rounded-[24px] border border-black/5 p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 shrink-0 border border-black/5">
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback className="font-bold bg-[#09090b] text-white">{user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className="flex-1 bg-[#f4f4f5] rounded-2xl px-5 py-3.5 text-[15px] font-semibold text-[#71717a] cursor-pointer hover:bg-[#e4e4e7] transition-colors"
                    role="button"
                  >
                    O que você quer compartilhar com a comunidade?
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-black/5">
                  {[
                    { label: "📷 Anexar Mídia", },
                    { label: "📹 Video/Live" },
                    { label: "📅 Novo Evento" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-[#3f3f46] bg-white border border-black/5 hover:bg-[#fafafa] hover:border-black/15 shadow-sm transition-all"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts feed */}
              {POSTS.map((post) => (
                <div key={post.id} className="bg-white rounded-[24px] border border-black/5 p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 shrink-0 border border-black/5">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback className="bg-[#09090b] text-white font-bold">{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-[15px] font-extrabold text-[#09090b]">{post.author}</span>
                        <Badge className="text-[10px] bg-[#09090b] text-white border-0 h-5 px-2 rounded-md font-bold">
                          {post.role}
                        </Badge>
                        <span className="text-[12px] font-semibold text-[#a1a1aa] flex items-center gap-1.5 ml-auto">
                          <Clock className="w-3.5 h-3.5" />{post.time}
                        </span>
                      </div>
                      <p className="text-[15px] text-[#3f3f46] leading-[1.6] max-w-2xl">{post.content}</p>
                      
                      {post.image && (
                        <div className="mt-4 overflow-hidden rounded-2xl border border-black/5">
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-full object-cover max-h-[300px] hover:scale-105 transition-transform duration-700"
                            width={600}
                            height={300}
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-6 mt-5 pt-4 border-t border-black/5">
                        <button className="flex items-center gap-2 text-[13px] font-bold text-[#71717a] hover:text-rose-500 transition-colors group">
                          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" /> {post.likes}
                        </button>
                        <button className="flex items-center gap-2 text-[13px] font-bold text-[#71717a] hover:text-[#09090b] transition-colors group">
                          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /> {post.comments} <span className="hidden sm:inline">Comentários</span>
                        </button>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4d4d8] ml-auto">
                          Mural Público
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
               {/* Community Setup Progress - NEW */}
               <div className="bg-[#09090b] rounded-[24px] border border-[#27272a] p-6 shadow-xl shadow-black/5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[15px] font-extrabold">Configuração da Conta</h3>
                  <span className="text-[13px] font-bold text-[#a1a1aa]">3/5 completos</span>
                </div>
                <div className="h-2 bg-[#27272a] rounded-full overflow-hidden my-4">
                  <div className="h-full bg-white rounded-full w-[60%]" />
                </div>
                <ul className="space-y-3 mt-5">
                  <li className="flex items-center gap-3 text-[13px] font-medium text-white/50 line-through">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">✓</div>
                    Criar conta
                  </li>
                  <li className="flex items-center gap-3 text-[13px] font-medium text-white/50 line-through">
                     <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">✓</div>
                    Completar perfil
                  </li>
                  <li className="flex items-center gap-3 text-[13px] font-medium text-white/50 line-through">
                     <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">✓</div>
                    Criar primeira comunidade
                  </li>
                  <li className="flex items-center gap-3 text-[14px] font-bold text-white">
                     <div className="w-5 h-5 rounded-full border-2 border-white/30 flex items-center justify-center"></div>
                    Convidar membros
                  </li>
                  <li className="flex items-center gap-3 text-[14px] font-bold text-white">
                     <div className="w-5 h-5 rounded-full border-2 border-white/30 flex items-center justify-center"></div>
                    Adicionar primeiro curso
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-white text-[#09090b] font-bold hover:bg-[#f4f4f5] h-11 rounded-xl">
                  Continuar configuração
                </Button>
              </div>

              {/* Level progress */}
              <div className="bg-white rounded-[24px] border border-black/5 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[15px] font-extrabold text-[#09090b]">Sua Jornada</h3>
                  <Badge className="bg-[#09090b] text-white border-0 font-bold px-2.5 py-1">
                    Lvl {user.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-black/5">
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                      <AvatarFallback className="font-bold text-xl bg-[#09090b] text-white">{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#09090b] border-[3px] border-white flex items-center justify-center shadow-sm">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[16px] font-bold text-[#09090b]">{user.fullName}</p>
                    <p className="text-[13px] font-semibold text-[#71717a]">@{user.username}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[12px] font-bold text-[#a1a1aa] uppercase tracking-wide">XP Restante</span>
                    <span className="text-[12px] font-extrabold text-[#09090b]">{user.points}/5000</span>
                  </div>
                  <div className="h-2.5 bg-[#f4f4f5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#09090b] rounded-full transition-all"
                      style={{ width: `${(user.points / 5000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <div className="flex-1 bg-[#f4f4f5] rounded-2xl p-4 text-center border border-black/5">
                    <p className="text-2xl font-extrabold text-[#f59e0b] -tracking-wide">{user.streak}</p>
                    <p className="text-[11px] font-bold text-[#71717a] uppercase mt-1">🔥 Streak</p>
                  </div>
                  <div className="flex-1 bg-[#f4f4f5] rounded-2xl p-4 text-center border border-black/5">
                    <p className="text-2xl font-extrabold text-[#09090b] -tracking-wide">{user.points.toLocaleString()}</p>
                    <p className="text-[11px] font-bold text-[#71717a] uppercase mt-1">⚡ Pontos</p>
                  </div>
                </div>
              </div>

              {/* Suggested communities */}
              <div className="bg-white rounded-[24px] border border-black/5 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[15px] font-extrabold text-[#09090b]">Top Comunidades</h3>
                  <Link href="/discover" className="text-[12px] text-[#09090b] font-bold hover:underline underline-offset-4">
                    Explorar
                  </Link>
                </div>
                <div className="space-y-4">
                  {COMMUNITIES.slice(2, 5).map((c) => (
                    <Link
                      key={c.id}
                      href={`/c/${c.slug}`}
                      className="flex items-center gap-4 group p-2 -mx-2 rounded-2xl hover:bg-black/5 transition-all"
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-black/5"
                        width={48}
                        height={48}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-[#09090b] group-hover:text-black transition-colors truncate">
                          {c.name}
                        </p>
                        <p className="text-[12px] font-semibold text-[#71717a]">
                          {(c.members / 1000).toFixed(1)}k membros
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-black/5 shadow-sm flex items-center justify-center group-hover:bg-[#09090b] group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4 text-[#a1a1aa] group-hover:text-white transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

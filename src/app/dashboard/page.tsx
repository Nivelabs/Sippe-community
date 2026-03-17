"use client";

import Link from "next/link";
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
    <Link href="/" className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
        <rect width="30" height="30" rx="8" fill="#0a0a0a" />
        <rect x="7" y="8" width="16" height="11" rx="4" fill="white" />
        <circle cx="11" cy="13.5" r="1.2" fill="#0a0a0a" />
        <circle cx="15" cy="13.5" r="1.2" fill="#0a0a0a" />
        <circle cx="19" cy="13.5" r="1.2" fill="#0a0a0a" />
        <path d="M11 19l2 3 2-3" fill="white" />
      </svg>
      <span className="text-lg font-extrabold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
        sippe
      </span>
    </Link>
  );
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = CURRENT_USER;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-[#e5e5e5] z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#e5e5e5]">
          <SippeLogo />
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#f5f5f5] transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#0a0a0a] text-white"
                  : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5]"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-[#09090b] text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          {/* My Communities */}
          <div className="pt-4 mt-2 border-t border-[#e5e5e5]">
            <p className="px-3 text-[10px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">
              Minhas Comunidades
            </p>
            {user.myCommunities.map((c) => (
              <Link
                key={c.id}
                href={`/c/${c.slug}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#f5f5f5] transition-colors group"
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-7 h-7 rounded-lg object-cover"
                  width={28}
                  height={28}
                />
                <span className="flex-1 text-xs font-medium text-[#737373] group-hover:text-[#0a0a0a] truncate transition-colors">
                  {c.name}
                </span>
                {c.unread > 0 && (
                  <span className="text-[10px] font-bold text-[#09090b]">{c.unread}</span>
                )}
              </Link>
            ))}
            <Link
              href="/create-community"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#f5f5f5] transition-colors mt-1"
            >
              <div className="w-7 h-7 rounded-lg border-2 border-dashed border-[#e5e5e5] flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-[#a3a3a3]" />
              </div>
              <span className="text-xs font-medium text-[#a3a3a3]">Criar comunidade</span>
            </Link>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#e5e5e5]">
          <Link href="/profile" className="flex items-center gap-3 group">
            <Avatar className="w-9 h-9 shrink-0">
              <AvatarImage src={user.avatar} alt={user.fullName} />
              <AvatarFallback className="text-sm font-bold">{user.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0a0a0a] truncate group-hover:text-[#09090b] transition-colors">
                {user.fullName}
              </p>
              <p className="text-xs text-[#a3a3a3]">Nível {user.level}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-[#e5e5e5] h-16 flex items-center px-4 lg:px-8 gap-4 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-[#737373]" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Olá, {user.fullName.split(" ")[0]}! 👋
            </h1>
            <p className="text-xs text-[#a3a3a3] hidden sm:block">
              {user.streak} dias seguidos de streak 🔥
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/create-community">
              <Button
                size="sm"
                className="rounded-full font-semibold text-sm hidden sm:flex"
                style={{ background: "#09090b", color: "white" }}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Nova Comunidade
              </Button>
            </Link>
            <button className="relative p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors">
              <Bell className="w-5 h-5 text-[#737373]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#09090b]" />
            </button>
            <Link href="/profile">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback className="text-sm font-bold">{user.fullName[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 lg:px-8 py-6">
          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Comunidades", value: user.communities, icon: Users, color: "#09090b", bg: "#f4f4f5" },
              { label: "Cursos ativos", value: user.courses, icon: BookOpen, color: "#3b82f6", bg: "#eff6ff" },
              { label: "Pontos", value: user.points.toLocaleString(), icon: Trophy, color: "#f59e0b", bg: "#fffbeb" },
              { label: "Streak", value: `${user.streak}d`, icon: Flame, color: "#ef4444", bg: "#fef2f2" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: stat.bg }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-[#09090b]" />
                </div>
                <p className="text-2xl font-extrabold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-[#a3a3a3] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main feed */}
            <div className="lg:col-span-2 space-y-5">
              {/* Post composer */}
              <div className="bg-white rounded-2xl border border-[#e5e5e5] p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback className="font-bold">{user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className="flex-1 bg-[#f5f5f5] rounded-xl px-4 py-3 text-sm text-[#a3a3a3] cursor-pointer hover:bg-[#ebebeb] transition-colors"
                    role="button"
                  >
                    O que você está pensando?
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-[#e5e5e5]">
                  {[
                    { label: "📷 Foto", },
                    { label: "📹 Vídeo" },
                    { label: "📅 Evento" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="flex-1 py-1.5 rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5] transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts feed */}
              {POSTS.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 shrink-0">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-[#0a0a0a]">{post.author}</span>
                        <Badge className="text-[10px] bg-[#f4f4f5] text-[#09090b] border-0 h-4 px-1.5">
                          {post.role}
                        </Badge>
                        <span className="text-xs text-[#a3a3a3] flex items-center gap-1 ml-auto">
                          <Clock className="w-3 h-3" />{post.time}
                        </span>
                      </div>
                      <p className="text-sm text-[#0a0a0a] leading-relaxed">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="mt-3 rounded-xl w-full object-cover max-h-56"
                          width={600}
                          height={224}
                        />
                      )}
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#f5f5f5]">
                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3] hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />{post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3] hover:text-[#09090b] transition-colors">
                          <MessageCircle className="w-4 h-4" />{post.comments}
                        </button>
                        <span className="text-[10px] text-[#d4d4d4] ml-auto">
                          AI Builders Club
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right sidebar */}
            <div className="space-y-5">
              {/* Level progress */}
              <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0a0a0a]">Meu Progresso</h3>
                  <Badge className="bg-[#f4f4f5] text-[#09090b] border-0">
                    Nível {user.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                      <AvatarFallback className="font-bold text-lg">{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#09090b] border-2 border-white flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0a0a0a]">{user.fullName}</p>
                    <p className="text-xs text-[#a3a3a3]">@{user.username}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-[#737373]">XP para o nível {user.level + 1}</span>
                    <span className="text-xs font-bold text-[#09090b]">{user.points}/5000</span>
                  </div>
                  <div className="h-2 bg-[#f5f5f5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#09090b] rounded-full transition-all"
                      style={{ width: `${(user.points / 5000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 bg-[#f5f5f5] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#f59e0b]">{user.streak}</p>
                    <p className="text-[10px] text-[#a3a3a3]">🔥 Streak</p>
                  </div>
                  <div className="flex-1 bg-[#f5f5f5] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#0a0a0a]">{user.points.toLocaleString()}</p>
                    <p className="text-[10px] text-[#a3a3a3]">⚡ Pontos</p>
                  </div>
                </div>
              </div>

              {/* Suggested communities */}
              <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0a0a0a]">Sugeridas para você</h3>
                  <Link href="/discover" className="text-xs text-[#09090b] font-semibold hover:underline">
                    Ver mais
                  </Link>
                </div>
                <div className="space-y-3">
                  {COMMUNITIES.slice(2, 5).map((c) => (
                    <Link
                      key={c.id}
                      href={`/c/${c.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-xl object-cover"
                        width={40}
                        height={40}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0a0a0a] group-hover:text-[#09090b] transition-colors truncate">
                          {c.name}
                        </p>
                        <p className="text-xs text-[#a3a3a3]">
                          {(c.members / 1000).toFixed(1)}k membros
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#d4d4d4] group-hover:text-[#09090b] transition-colors" />
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Globe,
  Calendar,
  Users,
  BookOpen,
  Trophy,
  Flame,
  Settings,
  ArrowLeft,
  Heart,
  MessageCircle,
  Clock,
  Share2,
  Edit3,
} from "lucide-react";
import { CURRENT_USER, POSTS, COMMUNITIES } from "@/lib/mock-data";

const tabs = ["Posts", "Comunidades", "Conquistas"];

const ACHIEVEMENTS = [
  { icon: "🔥", title: "Streaker", desc: "14 dias consecutivos", color: "#fef3c7" },
  { icon: "⭐", title: "Top Membro", desc: "Ficou no top 10", color: "#fef9c3" },
  { icon: "🚀", title: "Early Adopter", desc: "Entrou no beta", color: "#f4f4f5" },
  { icon: "📚", title: "Estudioso", desc: "10 cursos concluídos", color: "#eff6ff" },
  { icon: "💬", title: "Comunicador", desc: "500 posts feitos", color: "#fdf4ff" },
  { icon: "🎯", title: "Objetivo!", desc: "Meta mensal atingida", color: "#fff7ed" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");
  const user = CURRENT_USER;

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Top bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#e5e5e5] h-14 flex items-center px-4 sticky top-0 z-20">
        <Link href="/dashboard" className="flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] transition-colors mr-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Voltar</span>
        </Link>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#0a0a0a]">{user.fullName}</p>
          <p className="text-xs text-[#a3a3a3]">@{user.username}</p>
        </div>
        <Link href="/settings">
          <Button variant="outline" size="sm" className="rounded-xl border-[#e5e5e5] text-[#737373] gap-2">
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Configurações</span>
          </Button>
        </Link>
      </header>

      {/* Cover + Avatar */}
      <div className="relative">
        {/* Cover photo */}
        <div
          className="h-40 sm:h-52 w-full"
          style={{
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a2e21 50%, #09090b 100%)",
          }}
        >
          {/* Grid overlay sutil */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Profile info bar */}
        <div className="bg-white border-b border-[#e5e5e5] px-4 sm:px-8 pb-5">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between -mt-10 sm:-mt-14 mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 sm:w-28 sm:h-28 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback className="text-2xl font-bold bg-[#0a0a0a] text-white">
                    {user.fullName[0]}
                  </AvatarFallback>
                </Avatar>
                {/* Level badge */}
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#09090b] border-2 border-white flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{user.level}</span>
                </div>
              </div>
              <Link href="/settings">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-[#e5e5e5] text-[#0a0a0a] gap-2 mt-4"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Editar perfil
                </Button>
              </Link>
            </div>

            {/* Name & bio */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {user.fullName}
                </h1>
                <Badge className="bg-[#f4f4f5] text-[#09090b] border-0 font-semibold">
                  Nível {user.level}
                </Badge>
              </div>
              <p className="text-[#737373] text-sm font-medium">@{user.username}</p>
              <p className="text-[#0a0a0a] text-sm leading-relaxed max-w-lg">{user.bio}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#737373] pt-1">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {user.location}
                  </span>
                )}
                {user.website && (
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#09090b] hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" /> {user.website}
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Entrou em {user.joinedDate}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-5 pt-5 border-t border-[#f5f5f5]">
              {[
                { value: user.followers.toLocaleString(), label: "Seguidores" },
                { value: user.following.toLocaleString(), label: "Seguindo" },
                { value: user.communities, label: "Comunidades" },
                { value: user.courses, label: "Cursos" },
                { value: `${user.streak}d 🔥`, label: "Streak" },
                { value: user.points.toLocaleString(), label: "Pontos" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-extrabold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#a3a3a3]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#e5e5e5] sticky top-14 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#09090b] text-[#0a0a0a]"
                    : "border-transparent text-[#a3a3a3] hover:text-[#737373]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-4">
            {activeTab === "Posts" && (
              <>
                {POSTS.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] transition-shadow">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage src={user.avatar} alt={user.fullName} />
                        <AvatarFallback className="font-bold">{user.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-semibold text-[#0a0a0a]">{user.fullName}</span>
                          <span className="text-xs text-[#a3a3a3] flex items-center gap-1 ml-auto">
                            <Clock className="w-3 h-3" />{post.time}
                          </span>
                        </div>
                        <p className="text-sm text-[#0a0a0a] leading-relaxed">{post.content}</p>
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post"
                            className="mt-3 rounded-xl w-full object-cover max-h-52"
                            width={600}
                            height={208}
                          />
                        )}
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#f5f5f5]">
                          <button className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3] hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />{post.likes}
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3] hover:text-[#09090b] transition-colors">
                            <MessageCircle className="w-4 h-4" />{post.comments}
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-medium text-[#a3a3a3] hover:text-[#0a0a0a] transition-colors ml-auto">
                            <Share2 className="w-3.5 h-3.5" />Compartilhar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "Comunidades" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {user.myCommunities.map((c) => (
                  <Link key={c.id} href={`/c/${c.slug}`} className="group">
                    <div className="bg-white rounded-2xl border border-[#e5e5e5] p-4 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-12 h-12 rounded-xl object-cover"
                          width={48}
                          height={48}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-[#0a0a0a] truncate group-hover:text-[#09090b] transition-colors">
                            {c.name}
                          </h3>
                          <Badge className="bg-[#f5f5f5] text-[#737373] border-0 text-[10px] mt-1">
                            {c.role}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#a3a3a3]">
                        <Users className="w-3.5 h-3.5" />
                        <span>{(c.members / 1000).toFixed(1)}k membros</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === "Conquistas" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((ach) => (
                  <div
                    key={ach.title}
                    className="bg-white rounded-2xl border border-[#e5e5e5] p-4 flex items-center gap-4 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: ach.color }}
                    >
                      {ach.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0a0a0a]">{ach.title}</p>
                      <p className="text-xs text-[#a3a3a3]">{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Level card */}
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]">
              <h3 className="text-sm font-bold text-[#0a0a0a] mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#f59e0b]" /> Progresso
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Trophy, label: "Pontos totais", value: user.points.toLocaleString(), color: "#f59e0b" },
                  { icon: Flame, label: "Streak atual", value: `${user.streak} dias`, color: "#ef4444" },
                  { icon: BookOpen, label: "Cursos feitos", value: user.courses, color: "#3b82f6" },
                  { icon: Users, label: "Comunidades", value: user.communities, color: "#09090b" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#a3a3a3]">{item.label}</p>
                      <p className="text-sm font-bold text-[#0a0a0a]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested people */}
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]">
              <h3 className="text-sm font-bold text-[#0a0a0a] mb-4">Comunidades populares</h3>
              <div className="space-y-3">
                {COMMUNITIES.slice(0, 3).map((c) => (
                  <Link key={c.id} href={`/c/${c.slug}`} className="flex items-center gap-3 group">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-9 h-9 rounded-xl object-cover"
                      width={36}
                      height={36}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0a0a0a] group-hover:text-[#09090b] truncate transition-colors">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-[#a3a3a3]">{(c.members / 1000).toFixed(1)}k membros</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Play,
  Clock,
  CheckCircle2,
  LayoutDashboard,
  Compass,
  Users,
  Bell,
  Settings,
  Trophy,
  Flame,
  Lock,
  ChevronRight,
  Star,
  Menu,
  X,
  Plus
} from "lucide-react";
import { COURSES, CURRENT_USER } from "@/lib/mock-data";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Compass, label: "Explorar", href: "/discover" },
  { icon: Users, label: "Minhas Comunidades", href: "/dashboard/communities" },
  { icon: BookOpen, label: "Meus Cursos", href: "/dashboard/courses", active: true },
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

const FILTER_TABS = ["Todos", "Em andamento", "Concluídos"];

const ALL_COURSES = [
  ...COURSES,
  {
    id: "5",
    title: "Prompt Engineering Avançado",
    description: "Domine técnicas avançadas de prompting para maximizar resultados com LLMs.",
    cover: "https://picsum.photos/seed/course-prompt/400/200",
    lessons: 15,
    duration: "6h",
    free: false,
    progress: 0,
  },
  {
    id: "6",
    title: "MLOps para Engenheiros",
    description: "Deploy, monitoramento e manutenção de modelos de ML em produção.",
    cover: "https://picsum.photos/seed/course-mlops/400/200",
    lessons: 32,
    duration: "14h",
    free: false,
    progress: 45,
  },
];

export default function CoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const user = CURRENT_USER;

  const filtered = ALL_COURSES.filter((c) => {
    if (filter === "Em andamento") return c.progress > 0 && c.progress < 100;
    if (filter === "Concluídos") return c.progress === 100;
    return true;
  });

  const activeCount = ALL_COURSES.filter((c) => c.progress > 0 && c.progress < 100).length;
  const doneCount = ALL_COURSES.filter((c) => c.progress === 100).length;
  const totalProgress = Math.round(
    ALL_COURSES.reduce((acc, c) => acc + c.progress, 0) / ALL_COURSES.length
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex font-sans text-[#09090b]">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-black/5 z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-black/5">
          <SippeLogo />
          <button className="lg:hidden p-2 rounded-xl hover:bg-black/5 transition-colors text-[#71717a]" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
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
          
           {/* My Communities (Repeated in sidebar for consistency) */}
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

      {/* Main */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-black/5 h-[72px] flex items-center px-4 lg:px-10 gap-4 sticky top-0 z-30">
          <button className="lg:hidden p-2.5 rounded-xl hover:bg-black/5 transition-colors focus:ring-2 focus:ring-[#09090b]/20" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-[#09090b]" />
          </button>
          
          <div className="flex-1">
             <h1 className="text-xl lg:text-2xl font-extrabold text-[#09090b] tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
              Meus Cursos
            </h1>
            <p className="text-xs font-semibold text-[#71717a] hidden sm:block mt-0.5">{ALL_COURSES.length} cursos disponíveis no seu plano</p>
          </div>

          <div className="flex flex-row items-center gap-4">
             <Link href="/discover">
                <Button
                  size="sm"
                  className="hidden sm:flex rounded-full font-bold text-[13px] h-10 px-5 bg-[#09090b] text-white hover:bg-[#27272a] hover:shadow-lg hover:shadow-black/10 transition-all hover:-translate-y-0.5"
                >
                  <Compass className="w-4 h-4 mr-1.5" />
                  Explorar cursos
                </Button>
            </Link>
            <Link href="/profile" className="hidden sm:block">
              <Avatar className="w-10 h-10 ring-2 ring-offset-2 ring-transparent hover:ring-black/10 transition-all cursor-pointer">
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback className="text-sm font-bold bg-[#09090b] text-white">{user.fullName[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 lg:px-10 py-8 lg:py-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-5">
                {[
                  { label: "Total Inscritos", value: ALL_COURSES.length, icon: BookOpen, color: "#09090b", bg: "#f4f4f5" },
                  { label: "Em andamento", value: activeCount, icon: Play, color: "#09090b", bg: "#f4f4f5" },
                  { label: "Concluídos", value: doneCount, icon: CheckCircle2, color: "#09090b", bg: "#f4f4f5" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-[20px] border border-black/5 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-black/5" style={{ background: s.bg }}>
                      <s.icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <p className="text-3xl font-extrabold text-[#09090b] tracking-tight mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {s.value}
                    </p>
                    <p className="text-[12px] font-bold text-[#71717a] uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

               {/* Continue card (most recent active course) */}
               {ALL_COURSES.find((c) => c.progress > 0 && c.progress < 100) && (() => {
                const c = ALL_COURSES.find((c) => c.progress > 0 && c.progress < 100)!;
                return (
                  <div className="bg-[#09090b] rounded-[24px] p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-xl shadow-black/5 group relative overflow-hidden">
                    {/* Add subtle gradient behind */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    
                    <div className="relative w-full sm:w-[140px] h-32 sm:h-[100px] rounded-2xl overflow-hidden shrink-0 border border-white/5 shadow-md">
                      <img src={c.cover} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 text-[#09090b] fill-[#09090b] ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center relative z-10 w-full">
                       <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-white text-[#09090b] border-0 text-[10px] font-bold px-2 py-0.5 rounded-md self-start">EM ANDAMENTO</Badge>
                       </div>
                      <h3 className="text-white font-bold text-lg mb-4 line-clamp-1">{c.title}</h3>
                      <div className="flex items-center gap-4 w-full">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full relative" style={{ width: `${c.progress}%` }}>
                             {/* Small dot on the end of progress */}
                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                          </div>
                        </div>
                        <span className="text-[13px] font-extrabold text-white shrink-0">{c.progress}%</span>
                      </div>
                    </div>
                    
                    {/* Move button down naturally on mobile */}
                    <button className="relative z-10 shrink-0 px-6 py-3 bg-white text-[#09090b] text-[13px] font-bold rounded-xl hover:bg-[#f4f4f5] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto h-12 shadow-lg shadow-white/5 border border-white/10 hover:scale-[1.02]">
                      Continuar Aula
                      <Play className="w-3.5 h-3.5 fill-[#09090b]" />
                    </button>
                  </div>
                );
              })()}

              <div className="pt-2">
                 {/* Filter tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {FILTER_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all whitespace-nowrap ${
                        filter === tab
                          ? "bg-[#09090b] text-white shadow-md shadow-black/5"
                          : "bg-white border border-black/5 text-[#71717a] hover:text-[#09090b] hover:border-black/15 shadow-sm"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-[20px] border border-black/5 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all group flex flex-col h-full"
                  >
                    <div className="relative h-[160px] overflow-hidden">
                      <img
                        src={course.cover}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        width={400}
                        height={160}
                      />
                      {/* Overlay badges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      {course.progress === 100 && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-4 h-4 text-[#09090b]" />
                          </div>
                        </div>
                      )}
                      {!course.free && course.progress === 0 && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="w-8 h-8 rounded-full bg-[#09090b]/80 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
                            <Lock className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      )}
                      {course.free && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="px-2.5 py-1 rounded-md bg-white text-[#09090b] border-0 text-[10px] font-extrabold shadow-lg">
                            GRÁTIS
                          </Badge>
                        </div>
                      )}
                      
                      {/* Progress floating badge if active */}
                      {course.progress > 0 && course.progress < 100 && (
                         <div className="absolute bottom-4 left-4 z-10">
                            <Badge className="px-2.5 py-1 rounded-md bg-[#09090b]/80 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold shadow-lg shadow-black/20">
                               Em Progresso - {course.progress}%
                            </Badge>
                        </div>
                      )}

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/10 backdrop-blur-[2px]">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-[#09090b] fill-[#09090b] ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-extrabold text-[15px] text-[#09090b] mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{course.title}</h3>
                      <p className="text-[13px] text-[#71717a] line-clamp-2 mb-4 leading-relaxed font-medium flex-1">{course.description}</p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-[12px] font-semibold text-[#a1a1aa] mb-5">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />{course.lessons} aulas
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />{course.duration}
                        </span>
                      </div>

                      {/* Footer Actions / Progress */}
                      {course.progress > 0 ? (
                        <div className="mt-auto pt-4 border-t border-black/5">
                           {course.progress === 100 ? (
                             <div className="flex items-center justify-between">
                               <span className="flex items-center gap-1.5 text-[#09090b] font-bold text-[13px]">
                                <Star className="w-4 h-4 fill-[#09090b]" /> Curso Concluído
                               </span>
                               <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold px-3 rounded-lg hover:bg-black/5 border-black/10">Revisar</Button>
                             </div>
                           ) : (
                              <div>
                                <div className="flex justify-between items-center text-[11px] text-[#71717a] font-bold uppercase tracking-wide mb-2">
                                  <span>Progresso Global</span>
                                  <span className="text-[#09090b]">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-[#f4f4f5] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all bg-[#09090b]"
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>
                                <Button className="w-full mt-4 h-10 bg-white border border-black/10 shadow-sm text-[#09090b] font-bold text-[13px] hover:bg-black/5 rounded-xl group-hover:bg-[#09090b] group-hover:text-white transition-all">
                                   Continuar de onde parou
                                </Button>
                              </div>
                           )}
                        </div>
                      ) : (
                        <div className="mt-auto pt-4 border-t border-black/5">
                           <Button className="w-full h-11 bg-white border border-black/10 shadow-sm text-[#09090b] font-bold text-[13px] hover:bg-[#f4f4f5] rounded-xl group-hover:bg-[#09090b] group-hover:text-white transition-all">
                             Iniciar Curso
                           </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Right */}
            <div className="space-y-6">
              {/* Overall progress */}
              <div className="bg-white rounded-[24px] border border-black/5 p-6 shadow-sm">
                <h3 className="text-[15px] font-extrabold text-[#09090b] mb-6 tracking-tight">Estatísticas de Estudo</h3>
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                     {/* Modern progress ring design */}
                    <svg className="w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                       {/* Background Track */}
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f4f4f5" strokeWidth="3" />
                      {/* Foreground Track */}
                      <circle
                        cx="18" cy="18" r="15.9155" fill="none"
                        stroke="#09090b" strokeWidth="3"
                         strokeDasharray={`${totalProgress} ${100 - totalProgress}`}
                        strokeLinecap="round"
                         className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-[#09090b] -tracking-wide" style={{ fontFamily: "var(--font-jakarta)" }}>{totalProgress}%</span>
                      <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider mt-0.5">concluído</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f4f4f5] rounded-2xl p-4 text-center border border-black/5">
                    <p className="text-2xl font-extrabold text-[#09090b]">{activeCount}</p>
                    <p className="text-[11px] font-bold text-[#71717a] mt-1">Em Andamento</p>
                  </div>
                  <div className="bg-[#f4f4f5] rounded-2xl p-4 text-center border border-black/5">
                    <p className="text-2xl font-extrabold text-[#09090b]">{doneCount}</p>
                    <p className="text-[11px] font-bold text-[#71717a] mt-1">Concluídos</p>
                  </div>
                </div>
              </div>

               {/* Streak card Remake */}
               <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-[#09090b] mb-0.5">Sua Ofensiva</h3>
                    <p className="text-[12px] font-bold text-[#71717a] flex items-center gap-1.5"><span className="text-[#09090b]">{user.streak} dias</span> consecutivos</p>
                  </div>
                </div>
                <div className="flex gap-2 relative z-10">
                  {['S','T','Q','Q','S','S','D'].map((day, i) => {
                     const isComplete = i < user.streak % 7;
                     return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                         <span className="text-[10px] font-bold text-[#a1a1aa]">{day}</span>
                         <div
                            className={`w-full aspect-square rounded-[8px] flex items-center justify-center transition-colors ${
                               isComplete ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20" : "bg-[#f4f4f5] border border-black/5"
                            }`}
                          >
                             {isComplete && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                         </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Certificates Sidebar Item */}
              <div className="bg-white rounded-[24px] border border-black/5 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                   <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center border border-yellow-100">
                     <Trophy className="w-4 h-4 text-yellow-600" />
                   </div>
                   <h3 className="text-[15px] font-extrabold text-[#09090b]">Certificações</h3>
                </div>
                
                <div className="space-y-3">
                  {ALL_COURSES.filter((c) => c.progress === 100).map((c) => (
                    <div key={c.id} className="flex items-center gap-4 p-3 hover:bg-[#f4f4f5] rounded-xl transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-[#09090b] flex items-center justify-center shadow-md">
                         <Star className="w-4 h-4 fill-white text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#09090b] truncate group-hover:text-blue-600 transition-colors">{c.title}</p>
                        <p className="text-[11px] font-semibold text-[#71717a] mt-0.5">Emitido • Download PDF</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#a1a1aa] group-hover:text-[#09090b] transition-colors" />
                    </div>
                  ))}
                  {ALL_COURSES.filter((c) => c.progress === 100).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6 text-center bg-[#fafafa] rounded-xl border border-dashed border-black/10">
                       <Trophy className="w-8 h-8 text-[#d4d4d8] mb-3" />
                       <p className="text-[13px] font-bold text-[#71717a] px-4">
                         Conclua seu primeiro curso para desbloquear conquistas.
                       </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

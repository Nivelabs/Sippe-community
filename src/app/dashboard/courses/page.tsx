"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-[#e5e5e5] z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#e5e5e5]">
          <SippeLogo />
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-[#f5f5f5]" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active ? "bg-[#0a0a0a] text-white" : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5]"
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
        </nav>
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

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-[#e5e5e5] h-16 flex items-center px-4 lg:px-8 gap-4 sticky top-0 z-20">
          <button className="lg:hidden p-2 rounded-lg hover:bg-[#f5f5f5]" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-[#737373]" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
              Meus Cursos
            </h1>
            <p className="text-xs text-[#a3a3a3] hidden sm:block">{ALL_COURSES.length} cursos no total</p>
          </div>
          <Link href="/discover">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] text-white text-sm font-semibold rounded-xl hover:bg-[#333] transition-colors">
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Explorar cursos</span>
            </button>
          </Link>
        </header>

        <main className="flex-1 px-4 lg:px-8 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total", value: ALL_COURSES.length, icon: BookOpen, color: "#3b82f6", bg: "#eff6ff" },
                  { label: "Em andamento", value: activeCount, icon: Play, color: "#f59e0b", bg: "#fffbeb" },
                  { label: "Concluídos", value: doneCount, icon: CheckCircle2, color: "#09090b", bg: "#f4f4f5" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-[#e5e5e5] p-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                      <s.icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <p className="text-2xl font-extrabold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {s.value}
                    </p>
                    <p className="text-[10px] text-[#a3a3a3] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Continue card (most recent active course) */}
              {ALL_COURSES.find((c) => c.progress > 0 && c.progress < 100) && (() => {
                const c = ALL_COURSES.find((c) => c.progress > 0 && c.progress < 100)!;
                return (
                  <div className="bg-[#0a0a0a] rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <div className="relative w-full sm:w-32 h-24 sm:h-20 rounded-xl overflow-hidden shrink-0">
                      <img src={c.cover} alt={c.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge className="bg-[#09090b]/20 text-[#09090b] border-0 text-[10px] mb-1">Continuar</Badge>
                      <h3 className="text-white font-bold text-sm mb-2 line-clamp-1">{c.title}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#09090b] rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-[#09090b] shrink-0">{c.progress}%</span>
                      </div>
                    </div>
                    <button className="shrink-0 px-5 py-2.5 bg-[#09090b] text-white text-sm font-bold rounded-xl hover:bg-[#17a347] transition-colors flex items-center gap-2">
                      Continuar
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })()}

              {/* Filter tabs */}
              <div className="flex gap-2">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      filter === tab
                        ? "bg-[#0a0a0a] text-white"
                        : "bg-white border border-[#e5e5e5] text-[#737373] hover:text-[#0a0a0a]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Course grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden hover:shadow-md transition-all group"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={course.cover}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={144}
                      />
                      {/* Overlay badges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {course.progress === 100 && (
                        <div className="absolute top-3 right-3">
                          <div className="w-8 h-8 rounded-full bg-[#09090b] flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                      {!course.free && course.progress === 0 && (
                        <div className="absolute top-3 right-3">
                          <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                            <Lock className="w-3 h-3 text-[#737373]" />
                          </div>
                        </div>
                      )}
                      {course.free && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#09090b] text-white text-[10px] font-bold">
                            Grátis
                          </span>
                        </div>
                      )}
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-[#0a0a0a] mb-1 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-[#737373] line-clamp-2 mb-3">{course.description}</p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-[#a3a3a3] mb-3">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />{course.lessons} aulas
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />{course.duration}
                        </span>
                        {course.progress === 100 && (
                          <span className="ml-auto flex items-center gap-1 text-[#09090b] font-medium">
                            <Star className="w-3 h-3 fill-[#09090b]" />Concluído
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      {course.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-[10px] text-[#a3a3a3] mb-1">
                            <span>Progresso</span>
                            <span className="font-bold text-[#0a0a0a]">{course.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-[#f5f5f5] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${course.progress}%`,
                                background: course.progress === 100 ? "#09090b" : "#0a0a0a",
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {course.progress === 0 && (
                        <button className="w-full py-2 bg-[#f5f5f5] rounded-xl text-xs font-semibold text-[#737373] hover:bg-[#0a0a0a] hover:text-white transition-colors mt-1">
                          Começar curso
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Overall progress */}
              <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
                <h3 className="text-sm font-bold text-[#0a0a0a] mb-4">Progresso geral</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f5f5f5" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9155" fill="none"
                        stroke="#09090b" strokeWidth="3"
                        strokeDasharray={`${totalProgress} ${100 - totalProgress}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-extrabold text-[#0a0a0a]">{totalProgress}%</span>
                      <span className="text-[9px] text-[#a3a3a3]">concluído</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f5f5f5] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#0a0a0a]">{activeCount}</p>
                    <p className="text-[10px] text-[#a3a3a3]">Em andamento</p>
                  </div>
                  <div className="bg-[#f4f4f5] rounded-xl p-3 text-center">
                    <p className="text-lg font-extrabold text-[#09090b]">{doneCount}</p>
                    <p className="text-[10px] text-[#a3a3a3]">Concluídos</p>
                  </div>
                </div>
              </div>

              {/* Streak card */}
              <div className="bg-[#0a0a0a] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">{user.streak}d</p>
                    <p className="text-xs text-white/50">streak de estudo</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-1.5 rounded-full"
                      style={{ background: i < user.streak % 7 ? "#f97316" : "#ffffff15" }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-white/30 mt-2">Última semana</p>
              </div>

              {/* Certificates */}
              <div className="bg-white rounded-2xl border border-[#e5e5e5] p-5">
                <h3 className="text-sm font-bold text-[#0a0a0a] mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#f59e0b]" />
                  Certificados
                </h3>
                <div className="space-y-2">
                  {ALL_COURSES.filter((c) => c.progress === 100).map((c) => (
                    <div key={c.id} className="flex items-center gap-3 p-3 bg-[#f4f4f5] rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-[#09090b] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#0a0a0a] truncate">{c.title}</p>
                        <p className="text-[10px] text-[#09090b]">Certificado disponível</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#09090b]" />
                    </div>
                  ))}
                  {ALL_COURSES.filter((c) => c.progress === 100).length === 0 && (
                    <p className="text-xs text-[#a3a3a3] text-center py-3">
                      Conclua um curso para ganhar seu certificado!
                    </p>
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

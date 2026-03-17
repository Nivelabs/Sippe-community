"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Calendar,
  Trophy,
  Pin,
  Clock,
  Video,
  MapPin,
  Play,
  Lock,
  ChevronRight,
} from "lucide-react";
import { COMMUNITIES, POSTS, COURSES, MEMBERS, EVENTS } from "@/lib/mock-data";

function formatMembers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

export default function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const community = COMMUNITIES.find((c) => c.slug === slug);
  const [joined, setJoined] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  if (!community) notFound();

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted pt-16">
        {/* Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden bg-secondary">
          <img
            src={community.cover}
            alt={community.name}
            className="w-full h-full object-cover"
            width={1200}
            height={256}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Community Header */}
        <div className="bg-white border-b border-border">
          <div className="container-narrow py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 sm:-mt-12 relative z-10">
              {/* Avatar */}
              <img
                src={community.avatar}
                alt={community.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                width={96}
                height={96}
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1
                        className="text-xl md:text-2xl font-extrabold text-foreground"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {community.name}
                      </h1>
                      <Badge className="bg-secondary text-secondary-foreground border-0 text-xs">
                        {community.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {community.description}
                    </p>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={() => setJoined(!joined)}
                    className={`shrink-0 px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${
                      joined
                        ? "bg-secondary text-secondary-foreground border border-primary/30 hover:bg-primary/10"
                        : "bg-primary text-white hover:bg-brand-dark shadow-sm"
                    }`}
                  >
                    {joined ? "✓ Membro" : "Participar"}
                  </button>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-5 mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-foreground">
                      {formatMembers(community.members)}
                    </span>
                    <span>membros</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-semibold text-foreground">{community.online}</span>
                    <span>online agora</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span>por</span>
                    <img
                      src={community.ownerAvatar}
                      alt={community.owner}
                      className="w-5 h-5 rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                    <span className="font-semibold text-foreground">{community.owner}</span>
                  </div>
                  <Badge
                    className={
                      community.price === 0
                        ? "bg-secondary text-secondary-foreground border-0 text-xs"
                        : "bg-primary/10 text-primary border-0 text-xs"
                    }
                  >
                    {community.price === 0
                      ? "Grátis"
                      : `R$ ${community.price}/mês`}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="container-narrow py-6">
          <Tabs defaultValue="feed">
            <TabsList className="bg-white border border-border rounded-xl h-auto p-1 mb-6 flex gap-1 w-full sm:w-auto">
              {["feed", "cursos", "membros", "eventos", "sobre"].map((tab) => {
                const labels: Record<string, string> = {
                  feed: "Feed",
                  cursos: "Cursos",
                  membros: "Membros",
                  eventos: "Eventos",
                  sobre: "Sobre",
                };
                return (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="flex-1 sm:flex-none rounded-lg text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    {labels[tab]}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* FEED */}
            <TabsContent value="feed">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* New post composer */}
                  <div className="bg-white rounded-2xl border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm">
                        V
                      </div>
                      <input
                        placeholder="Compartilhe algo com a comunidade..."
                        className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary/20"
                      />
                    </div>
                    <div className="flex justify-end mt-3">
                      <button className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors">
                        Publicar
                      </button>
                    </div>
                  </div>

                  {/* Posts */}
                  {POSTS.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-2xl border border-border p-5"
                    >
                      {post.pinned && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                          <Pin className="w-3.5 h-3.5" />
                          <span>Fixado pelo admin</span>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <Avatar className="w-9 h-9 shrink-0">
                          <AvatarImage src={post.authorAvatar} alt={post.author} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-foreground">
                              {post.author}
                            </span>
                            <Badge className="text-xs bg-secondary text-secondary-foreground border-0 h-4 px-1.5">
                              {post.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.time}
                            </span>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">
                            {post.content}
                          </p>
                          {post.image && (
                            <img
                              src={post.image}
                              alt="Post image"
                              className="mt-3 rounded-xl w-full object-cover max-h-64"
                              width={600}
                              height={256}
                            />
                          )}
                          <div className="flex items-center gap-4 mt-4">
                            <button
                              onClick={() => toggleLike(post.id)}
                              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                                likedPosts.has(post.id)
                                  ? "text-red-500"
                                  : "text-muted-foreground hover:text-red-500"
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`}
                              />
                              {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments}
                            </button>
                            <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors ml-auto">
                              <Share2 className="w-4 h-4" />
                              Compartilhar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Online members */}
                  <div className="bg-white rounded-2xl border border-border p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Online agora ({community.online})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {MEMBERS.slice(0, 6).map((m) => (
                        <Avatar key={m.id} className="w-8 h-8">
                          <AvatarImage src={m.avatar} alt={m.name} />
                          <AvatarFallback className="text-xs">{m.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold text-primary">
                        +{community.online - 6}
                      </div>
                    </div>
                  </div>

                  {/* Top leaderboard */}
                  <div className="bg-white rounded-2xl border border-border p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-primary" />
                      Top membros
                    </h3>
                    <div className="space-y-3">
                      {MEMBERS.slice(0, 4).map((m, i) => (
                        <div key={m.id} className="flex items-center gap-2">
                          <span className="text-xs font-bold text-muted-foreground w-4">
                            {i + 1}
                          </span>
                          <Avatar className="w-7 h-7">
                            <AvatarImage src={m.avatar} alt={m.name} />
                            <AvatarFallback className="text-xs">{m.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium text-foreground flex-1 truncate">
                            {m.name}
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {m.points.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* COURSES */}
            <TabsContent value="cursos">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
                {COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={course.cover}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={144}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 text-primary fill-primary" />
                        </div>
                      </div>
                      {!course.free && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                            <Lock className="w-3 h-3 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                      {course.free && (
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
                            Grátis
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {course.lessons} aulas
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* MEMBERS */}
            <TabsContent value="membros">
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    Leaderboard
                  </h3>
                  <div className="flex gap-2">
                    {["Esta semana", "Este mês", "Tudo"].map((p) => (
                      <button
                        key={p}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          p === "Esta semana"
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {MEMBERS.map((member, index) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-600"
                            : index === 1
                            ? "bg-gray-100 text-gray-600"
                            : index === 2
                            ? "bg-orange-100 text-orange-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                      </div>
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {member.name}
                          </span>
                          <Badge className="bg-secondary text-secondary-foreground border-0 text-xs h-4 px-1.5">
                            {member.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress
                            value={(member.points / 10000) * 100}
                            className="h-1.5 flex-1 bg-muted"
                          />
                          <span className="text-xs text-muted-foreground shrink-0">
                            Nível {member.level}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-primary">
                          {member.points.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">pontos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* EVENTS */}
            <TabsContent value="eventos">
              <div className="space-y-4">
                {EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col sm:flex-row"
                  >
                    <div className="relative h-40 sm:h-auto sm:w-48 shrink-0 overflow-hidden bg-muted">
                      <img
                        src={event.cover}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        width={192}
                        height={160}
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`text-xs border-0 ${
                              event.type === "online"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {event.type === "online" ? (
                              <span className="flex items-center gap-1">
                                <Video className="w-3 h-3" /> Online
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> Presencial
                              </span>
                            )}
                          </Badge>
                        </div>
                        <h3
                          className="font-semibold text-foreground mb-1"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-medium text-foreground">
                            <Calendar className="w-4 h-4 text-primary" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {event.attendees}
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold hover:bg-brand-dark transition-colors flex items-center gap-1">
                          Participar
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ABOUT */}
            <TabsContent value="sobre">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3
                      className="text-lg font-bold text-foreground mb-4"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Sobre a comunidade
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {community.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {community.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { label: "Membros", value: formatMembers(community.members) },
                        { label: "Online agora", value: community.online },
                        {
                          label: "Valor",
                          value: community.price === 0 ? "Grátis" : `R$ ${community.price}/mês`,
                        },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="bg-muted rounded-xl p-4 text-center"
                        >
                          <p
                            className="text-2xl font-extrabold text-primary mb-1"
                            style={{ fontFamily: "var(--font-jakarta)" }}
                          >
                            {value}
                          </p>
                          <p className="text-xs text-muted-foreground">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Owner card */}
                <div className="bg-white rounded-2xl border border-border p-6 h-fit">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Criado por</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={community.ownerAvatar}
                      alt={community.owner}
                      className="w-12 h-12 rounded-xl object-cover"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{community.owner}</p>
                      <p className="text-xs text-muted-foreground">Fundador</p>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                    Ver perfil
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}

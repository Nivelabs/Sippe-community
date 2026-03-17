"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommunityCard from "@/components/community/CommunityCard";
import { Input } from "@/components/ui/input";
import { COMMUNITIES, CATEGORIES } from "@/lib/mock-data";
import { Search, SlidersHorizontal } from "lucide-react";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = useMemo(() => {
    return COMMUNITIES.filter((c) => {
      const matchesCategory =
        activeCategory === "Todos" || c.category === activeCategory;
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted pt-16">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-16 z-40">
          <div className="container-narrow py-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-5">
              <div>
                <h1
                  className="text-2xl font-extrabold text-heading"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  Descobrir comunidades
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {COMMUNITIES.length} comunidades disponíveis
                </p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar comunidades, tópicos ou criadores..."
                className="pl-10 h-11 rounded-xl border-border bg-muted focus-visible:bg-white"
              />
            </div>

            {/* Category chips */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hidden pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white border border-border text-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Community Grid */}
        <div className="container-narrow py-8">
          {filtered.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado
                {filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3
                className="text-xl font-bold text-foreground mb-2"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Nenhuma comunidade encontrada
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Tente buscar por outros termos ou explore todas as categorias.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("Todos");
                }}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-brand-dark transition-colors"
              >
                Ver todas as comunidades
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

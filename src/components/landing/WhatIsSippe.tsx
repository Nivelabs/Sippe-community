"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatIsSippe() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-black/5">
      <div className="container-narrow relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#09090b]/5 border border-[#09090b]/10 text-[#09090b] text-xs font-bold px-3 py-1.5 rounded-full mb-6 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#09090b] animate-pulse" />
            BEM-VINDO Á SIPPE
          </div>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-[#09090b] leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            A nova casa das suas comunidades digitais.
          </h2>
          <p className="text-[#71717a] text-lg leading-relaxed">
            Sippe é a plataforma definitiva para criadores de conteúdo que querem agrupar
            cursos, eventos e uma comunidade engajada no mesmo lugar, de forma premium,
            branca e customizável.
          </p>
        </div>

        {/* Video Placeholder Area */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5 group cursor-pointer bg-[#09090b]">
          <div className="aspect-video relative">
            {/* Fake video thumbnail using placeholder */}
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
              alt="Video thumbnail"
              fill
              className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 text-[#09090b] ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Video Copy / Tagline */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 z-10">
              <p className="text-white text-xl lg:text-2xl font-bold tracking-tight mb-2">
                Descubra por que os maiores criadores usam Sippe.
              </p>
              <p className="text-white/70 text-sm font-medium">
                Assista ao vídeo e veja a plataforma em ação (2 min)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="rounded-full shadow-md hover:shadow-lg border border-black/5 bg-[#09090b] text-white font-bold px-8 h-12 transition-all hover:-translate-y-0.5"
          >
            Começar minha comunidade grátis
          </Button>
        </div>
      </div>
    </section>
  );
}

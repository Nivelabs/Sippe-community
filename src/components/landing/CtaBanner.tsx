"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-[#111] border-t border-[#222]">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/10 px-6 py-16 lg:px-20 lg:py-28 text-center shadow-2xl">
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Subtle center glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-6"
            >
              Comece hoje mesmo
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-[clamp(32px,5vw,68px)] font-bold text-white leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.04em" }}
            >
              Pronto para construir
              <br />
              sua comunidade?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="text-base text-white/50 mb-10 max-w-sm mx-auto leading-relaxed"
            >
              Junte-se a 15.000+ criadores que já crescem, ensinam e monetizam com o Sippe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/signup">
                <button className="inline-flex items-center gap-2 bg-white text-[#111] font-semibold px-8 py-3 rounded-full hover:bg-[#F5F5F5] transition-colors text-sm group">
                  Criar minha comunidade
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/discover">
                <button className="inline-flex items-center gap-2 bg-transparent text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-colors text-sm border border-white/20">
                  Explorar comunidades
                </button>
              </Link>
            </motion.div>

            <p className="text-white/25 text-xs mt-6">
              Sem cartão · Setup em 5 minutos · Cancele quando quiser
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

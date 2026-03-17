"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

/* ── Showcase items — explicit grid placement (4 cols × 2 rows) ────── */
const showcaseItems = [
  {
    id: 1, seed: "community-tech-01", w: 900, h: 500, name: "AI Builders Club", members: "18.5k",
    gridStyle: { gridColumn: "1 / 3", gridRow: "1" },
  },
  {
    id: 2, seed: "community-design-02", w: 480, h: 560, name: "Design Hub BR", members: "9.2k",
    gridStyle: { gridColumn: "3", gridRow: "1 / 3" },
  },
  {
    id: 3, seed: "community-business-03", w: 480, h: 500, name: "Founders BR", members: "12.1k",
    gridStyle: { gridColumn: "4", gridRow: "1" },
  },
  {
    id: 4, seed: "community-health-04", w: 480, h: 500, name: "Saúde & Bem-estar", members: "7.4k",
    gridStyle: { gridColumn: "1", gridRow: "2" },
  },
  {
    id: 5, seed: "community-creative-05", w: 480, h: 500, name: "Escola de Criativos", members: "5.8k",
    gridStyle: { gridColumn: "2", gridRow: "2" },
  },
  {
    id: 6, seed: "community-music-06", w: 480, h: 500, name: "Music Makers", members: "3.2k",
    gridStyle: { gridColumn: "4", gridRow: "2" },
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.55 },
  },
};
const card: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 18 } as never,
  },
};

export default function Hero() {
  return (
    <section className="bg-white pt-24 pb-0 overflow-hidden">
      <div className="flex flex-col items-center text-center px-6">

        {/* ── Announcement badge ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 mt-6"
        >
          <Link
            href="/discover"
            className="inline-flex items-center gap-2.5 bg-[#F5F5F5] hover:bg-[#EFEFEF] transition-colors rounded-full pl-2.5 pr-4 py-1.5 group"
          >
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/24?u=badge-${i}`}
                  alt=""
                  className="w-5 h-5 rounded-full border-2 border-white object-cover"
                  width={20}
                  height={20}
                />
              ))}
            </div>
            <span className="text-[13px] font-medium text-[#111]">
              15.000+ criadores já estão no Sippe
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#999] group-hover:text-[#111] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </motion.div>

        {/* ── Giant heading ──────────────────────────────────────────── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(52px,9vw,110px)] font-bold text-[#111] leading-[0.94] max-w-4xl"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            letterSpacing: "-0.04em",
          }}
        >
          Cresça sua
          <br />
          comunidade.
          <br />
          Lance cursos.
        </motion.h1>

        {/* ── Subtitle ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
          className="mt-7 text-lg text-[#666] max-w-[440px] leading-relaxed"
        >
          Sippe é a plataforma tudo-em-um para criar comunidades,
          lançar cursos e monetizar seu conhecimento — em português.
        </motion.p>

        {/* ── CTAs ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34, ease: "easeOut" }}
          className="flex items-center gap-3 mt-8 flex-wrap justify-center"
        >
          <Link href="/signup">
            <button className="inline-flex items-center gap-2 bg-[#111] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-black transition-colors group">
              Começar grátis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          <button className="inline-flex items-center gap-2 bg-white text-[#111] text-sm font-semibold px-6 py-3 rounded-full border border-[#E0E0E0] hover:bg-[#F5F5F5] transition-colors">
            Ver demonstração
          </button>
        </motion.div>

        {/* ── Stats strip ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-8 mt-12 flex-wrap justify-center"
        >
          {[
            { value: "8.400+", label: "Comunidades" },
            { value: "24.000+", label: "Cursos" },
            { value: "R$ 120M+", label: "Receita gerada" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span
                className="text-xl font-bold text-[#111]"
                style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
              >
                {value}
              </span>
              <span className="text-xs text-[#999]">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Masonry Showcase Grid ─────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mt-16 px-4 sm:px-6 relative"
      >
        {/* Grid with specific spans mimicking Framer's masonry */}
        <div
          className="grid grid-cols-4 gap-3"
          style={{ gridTemplateRows: "260px 260px" }}
        >
          {showcaseItems.map((item) => (
            <motion.div
              key={item.id}
              variants={card}
              whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
              style={item.gridStyle}
              className="rounded-2xl overflow-hidden bg-[#F2F2F2] relative group cursor-pointer"
            >
              <img
                src={`https://picsum.photos/seed/${item.seed}/${item.w}/${item.h}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                  <span className="text-xs font-semibold text-[#111]">{item.name}</span>
                  <span className="text-xs text-[#999]">· {item.members} membros</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom fade gradient — suggests more content below */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}

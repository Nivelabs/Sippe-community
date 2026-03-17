"use client";

import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";
import { motion } from "framer-motion";

function formatMembers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#F7F7F7] border-t border-[#E5E5E5]">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-4">
            Depoimentos
          </p>
          <h2
            className="text-[clamp(28px,4vw,48px)] font-bold text-[#111] leading-[1.05]"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
          >
            Criadores que já{" "}
            <span className="text-[#737373]">confiam</span> no Sippe
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#CCCCCC] hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#111] text-[#111]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#444] leading-relaxed flex-1 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F2F2F2]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover"
                  width={36}
                  height={36}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#111] leading-tight">{t.name}</p>
                  <p className="text-[11px] text-[#999]">{t.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-[#111]">
                    {formatMembers(t.members)} membros
                  </p>
                  <p className="text-[11px] text-[#999]">{t.community}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

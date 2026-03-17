"use client";

import { Users, BookOpen, Calendar, Trophy, CreditCard, BarChart2, ArrowRight } from "lucide-react";
import { FEATURES } from "@/lib/mock-data";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ElementType> = {
  users: Users,
  "book-open": BookOpen,
  calendar: Calendar,
  trophy: Trophy,
  "credit-card": CreditCard,
  "bar-chart": BarChart2,
};

export default function Features() {
  return (
    <section id="features" className="section-padding bg-[#F7F7F7] border-t border-[#E5E5E5]">
      <div className="container-narrow">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-4">
            Recursos
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[clamp(32px,4vw,52px)] font-bold text-[#111] leading-[1.0]"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
            >
              Uma plataforma,
              <br />
              infinitas possibilidades
            </h2>
            <p className="text-base text-[#666] max-w-xs leading-relaxed">
              Do feed de comunidade até cursos, eventos e gamificação — tudo integrado.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon];
            const isFeatured = index === 0 || index === 4;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className={`bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#CCCCCC] hover:shadow-lg transition-all duration-200 group ${
                  isFeatured ? "lg:col-span-1" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#F2F2F2] group-hover:bg-[#EBEBEB] flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-[#111]" />
                </div>
                <h3
                  className="text-sm font-semibold text-[#111] mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-[#E5E5E5] p-6"
        >
          <div>
            <p
              className="text-base font-semibold text-[#111]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Pronto para começar?
            </p>
            <p className="text-sm text-[#737373] mt-0.5">
              Crie sua comunidade em menos de 5 minutos. Sem cartão de crédito.
            </p>
          </div>
          <a
            href="/signup"
            className="shrink-0 inline-flex items-center gap-2 bg-[#111] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-black transition-colors group"
          >
            Criar comunidade
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Users, BookOpen, Calendar, Trophy, CreditCard, BarChart2 } from "lucide-react";
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
    <section id="features" className="section-padding bg-muted">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-semibold mb-4">
            Tudo que você precisa
          </span>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-heading mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Uma plataforma,{" "}
            <span className="text-primary">infinitas possibilidades</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Do feed de comunidade até cursos online, eventos e gamificação — tudo
            integrado e funcionando junto para você crescer mais rápido.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mt-12 rounded-3xl bg-gradient-to-br from-primary to-brand-dark p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10">
            <h3
              className="text-2xl lg:text-3xl font-extrabold mb-2"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Comece a construir hoje mesmo
            </h3>
            <p className="text-white/80 text-base">
              Crie sua comunidade gratuita em menos de 5 minutos. Sem cartão de crédito.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/signup"
            className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:bg-green-50 transition-colors text-base shadow-xl"
          >
            Criar comunidade grátis
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

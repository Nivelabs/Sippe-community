"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-muted relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      
      <div className="container-narrow relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-[#09090b] text-sm font-semibold mb-4">
            Preços
          </span>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-heading mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Comece de graça,{" "}
            <span className="text-[#09090b]">cresça sem limites</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Sem taxas surpresa. Cancele quando quiser.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative rounded-3xl p-6 flex flex-col transition-shadow duration-300 ${
                plan.featured
                  ? "bg-[#09090b] text-white shadow-2xl shadow-primary/40 scale-105 z-10"
                  : "bg-white border border-border hover:shadow-xl"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
                    className="inline-block px-4 py-1 rounded-full bg-white text-[#09090b] text-xs font-bold shadow-md"
                  >
                    Mais popular ⚡
                  </motion.span>
                </div>
              )}

              {/* Decorative background glow for featured plan */}
              {plan.featured && (
                <div className="absolute inset-0 bg-white/5 rounded-3xl -z-10 blur-xl" />
              )}

              <div className="mb-6 relative z-10">
                <h3
                  className={`text-lg font-bold mb-1 ${plan.featured ? "text-white" : "text-foreground"}`}
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span
                      className={`text-4xl font-extrabold ${plan.featured ? "text-white" : "text-foreground"}`}
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      Grátis
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-sm font-medium ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}
                      >
                        R$
                      </span>
                      <span
                        className={`text-4xl font-extrabold ${plan.featured ? "text-white" : "text-foreground"}`}
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-sm ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}
                      >
                        /mês
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1 relative z-10">
                {plan.features.map((feature, i) => (
                  <motion.li 
                    key={feature}
                    custom={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (index * 0.1) + (i * 0.05) }}
                    className="flex items-start gap-2.5"
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.featured ? "bg-white/20" : "bg-secondary"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${plan.featured ? "text-white" : "text-[#09090b]"}`}
                        strokeWidth={2.5}
                      />
                    </div>
                    <span
                      className={`text-sm ${plan.featured ? "text-white/90" : "text-foreground"}`}
                    >
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <Link href={plan.id === "enterprise" ? "#" : "/signup"} className="relative z-10 mt-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-full font-bold text-sm transition-colors ${
                    plan.featured
                      ? "bg-white text-[#09090b] hover:bg-green-50 shadow-md"
                      : "bg-[#09090b] text-white hover:bg-brand-dark shadow-sm"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

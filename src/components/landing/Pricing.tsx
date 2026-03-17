"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-white border-t border-[#E5E5E5]">
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
            Preços
          </p>
          <h2
            className="text-[clamp(28px,4vw,52px)] font-bold text-[#111] leading-[1.0]"
            style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
          >
            Comece de graça,
            <br />
            <span className="text-[#737373]">cresça sem limites</span>
          </h2>
          <p className="text-[#737373] text-base mt-4">
            Sem taxas surpresa. Cancele quando quiser.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col border transition-all duration-200 ${
                plan.featured
                  ? "bg-[#111] border-transparent text-white shadow-2xl shadow-black/15 scale-[1.03] z-10"
                  : "bg-white border-[#E5E5E5] hover:border-[#CCCCCC] hover:shadow-md"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[#111] text-[10px] font-bold shadow-sm border border-[#E5E5E5]">
                    Mais popular ⚡
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-sm font-semibold mb-1 ${plan.featured ? "text-white" : "text-[#111]"}`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {plan.name}
                </h3>
                <p className={`text-xs mb-5 ${plan.featured ? "text-white/60" : "text-[#999]"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span
                      className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-[#111]"}`}
                      style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
                    >
                      Grátis
                    </span>
                  ) : (
                    <>
                      <span className={`text-xs ${plan.featured ? "text-white/60" : "text-[#999]"}`}>
                        R$
                      </span>
                      <span
                        className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-[#111]"}`}
                        style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
                      >
                        {plan.price}
                      </span>
                      <span className={`text-xs ${plan.featured ? "text-white/60" : "text-[#999]"}`}>
                        /mês
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.featured ? "bg-white/20" : "bg-[#F2F2F2]"
                      }`}
                    >
                      <Check
                        className={`w-2.5 h-2.5 ${plan.featured ? "text-white" : "text-[#555]"}`}
                        strokeWidth={3}
                      />
                    </div>
                    <span className={`text-xs ${plan.featured ? "text-white/80" : "text-[#555]"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.id === "enterprise" ? "#" : "/signup"} className="mt-auto">
                <button
                  className={`w-full py-2.5 px-5 rounded-full font-semibold text-xs transition-colors ${
                    plan.featured
                      ? "bg-white text-[#111] hover:bg-[#F2F2F2]"
                      : "bg-[#111] text-white hover:bg-black"
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

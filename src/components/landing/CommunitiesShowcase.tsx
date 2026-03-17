"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CommunityCard from "@/components/community/CommunityCard";
import { COMMUNITIES } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function CommunitiesShowcase() {
  return (
    <section className="section-padding bg-white border-t border-[#E5E5E5]">
      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-semibold text-[#999] uppercase tracking-widest mb-3">
              Comunidades em destaque
            </p>
            <h2
              className="text-[clamp(28px,4vw,44px)] font-bold text-[#111] leading-[1.0]"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.03em" }}
            >
              Descubra onde os
              <br />
              criadores crescem
            </h2>
          </div>
          <Link href="/discover">
            <Button
              variant="outline"
              className="rounded-full font-medium text-sm gap-2 border-[#E0E0E0] text-[#737373] hover:text-[#111] hover:border-[#111] hover:bg-transparent transition-all shrink-0"
            >
              Ver todas
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {COMMUNITIES.slice(0, 6).map((community) => (
            <motion.div
              key={community.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 80, damping: 16 },
                },
              }}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
            >
              <CommunityCard community={community} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

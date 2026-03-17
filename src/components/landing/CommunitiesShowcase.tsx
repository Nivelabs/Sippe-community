"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CommunityCard from "@/components/community/CommunityCard";
import { COMMUNITIES } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function CommunitiesShowcase() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-secondary/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container-narrow relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-[#09090b] text-sm font-semibold mb-3">
              Comunidades em destaque
            </span>
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-heading"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Descubra onde os criadores crescem
            </h2>
          </div>
          <Link href="/discover">
            <Button
              variant="outline"
              className="rounded-full font-semibold shrink-0 gap-2 hover:bg-secondary transition-colors"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Community Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {COMMUNITIES.slice(0, 6).map((community) => (
            <motion.div
              key={community.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 100, damping: 15 }
                },
              }}
            >
              <CommunityCard community={community} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

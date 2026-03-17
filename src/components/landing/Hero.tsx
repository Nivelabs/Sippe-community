"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, TrendingUp, Users, BookOpen } from "lucide-react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background gradient blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-0 w-[700px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #22c55e 0%, #bbf7d0 40%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #22c55e 0%, transparent 70%)",
          transform: "translate(-40%, 40%)",
        }}
      />

      <div className="container-narrow relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Social proof pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-8 shadow-sm">
              <div className="flex -space-x-1.5">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/24?u=hero-${i}`}
                    alt=""
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    width={24}
                    height={24}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-medium text-secondary-foreground">
                +15.000 criadores ativos
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 text-display"
              style={{ color: "var(--heading)" }}
            >
              Cresça sua{" "}
              <span className="text-primary relative inline-block">
                comunidade.
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-3 -right-6 text-2xl"
                >
                  ✨
                </motion.span>
              </span>
              <br />
              Lance seus{" "}
              <span className="relative">
                cursos.
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                    d="M2 9.5C60 3.5 150 1 298 9.5"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Sippe é a plataforma tudo-em-um para criar comunidades que engajam,
              cursos que educam e eventos que conectam. Tudo em português, do jeito
              brasileiro.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="rounded-full bg-primary text-white hover:bg-brand-dark font-bold px-8 text-base shadow-lg shadow-primary/25 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Começar agora
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-semibold text-base px-6 gap-2 hover:bg-secondary transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-3 h-3 text-primary fill-primary" />
                </div>
                Ver como funciona
              </Button>
            </motion.div>

            {/* Micro stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: Users, label: "Comunidades", value: "8.400+" },
                { icon: BookOpen, label: "Cursos", value: "24.000+" },
                { icon: TrendingUp, label: "Receita gerada", value: "R$ 120M+" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-none">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
            className="relative lg:block"
          >
            {/* Background glowing shape for the dashboard */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-emerald-200/20 rounded-[2rem] blur-xl opacity-70 -z-10" />
            
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/60 bg-white/80 backdrop-blur-sm"
            >
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/90 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-muted/80 rounded-md h-6 mx-4 flex items-center px-3">
                  <span className="text-xs text-muted-foreground">sippe.com/c/ai-builders</span>
                </div>
              </div>

              {/* Mock community page */}
              <div className="p-0 bg-[#f9fafb]/50">
                {/* Banner */}
                <div className="h-32 relative overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/herocover/800/200"
                    alt="Community cover"
                    className="w-full h-full object-cover"
                    width={600}
                    height={128}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Community header overlay */}
                  <div className="absolute bottom-3 left-4 flex items-end gap-3 z-10">
                    <motion.img
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                      src="https://i.pravatar.cc/48?u=hero-community"
                      alt="Community avatar"
                      className="w-12 h-12 rounded-xl border-2 border-white object-cover shadow-md"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">AI Builders Club</p>
                      <p className="text-white/80 text-xs">12.4k membros · Tecnologia</p>
                    </div>
                  </div>
                </div>

                {/* Mock tabs */}
                <div className="flex gap-0 border-b border-border bg-white/90 px-4">
                  {["Feed", "Cursos", "Membros", "Eventos"].map((tab, i) => (
                    <div
                      key={tab}
                      className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                        i === 0
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground"
                      }`}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                {/* Mock posts */}
                <div className="p-4 space-y-3">
                  {[
                    {
                      avatar: "https://i.pravatar.cc/32?u=post-1",
                      name: "Lucas Mendes",
                      time: "há 2h",
                      text: "🚀 Novo módulo sobre fine-tuning de LLMs disponível!",
                      likes: 142,
                    },
                    {
                      avatar: "https://i.pravatar.cc/32?u=post-2",
                      name: "Mariana Silva",
                      time: "há 5h",
                      text: "Consegui integrar GPT-4 no meu app em 30 min! 🎉",
                      likes: 89,
                    },
                  ].map((post, idx) => (
                    <motion.div 
                      key={post.name} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (idx * 0.15), type: "spring" }}
                      className="bg-white rounded-xl p-3 border border-border/80 shadow-sm hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={post.avatar}
                          alt={post.name}
                          className="w-7 h-7 rounded-full object-cover"
                          width={28}
                          height={28}
                        />
                        <span className="text-xs font-semibold">{post.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{post.time}</span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed">{post.text}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="text-[10px]">❤️</span> {post.likes}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">
                          <span className="text-[10px]">💬</span> Ver comentários
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 150 }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl border border-border/50 p-3 flex items-center gap-3 z-20 backdrop-blur-md"
              style={{ minWidth: 180 }}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">+340 membros</p>
                <p className="text-xs text-muted-foreground">essa semana</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 150 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-border/50 p-3 flex items-center gap-3 z-20 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-lg">🏆</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Top #1</p>
                <p className="text-xs text-muted-foreground">Tecnologia</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

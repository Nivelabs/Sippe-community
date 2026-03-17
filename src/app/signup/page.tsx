"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";

const benefits = [
  "Comunidade ilimitada no plano gratuito",
  "Cursos, eventos e gamificação inclusos",
  "Pagamentos integrados sem taxa extra",
  "Suporte em português 24/7",
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-14 overflow-hidden bg-[#0a0a0a]">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Green glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 20%, rgba(29,185,84,0.18) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 80%, rgba(29,185,84,0.10) 0%, transparent 65%)",
          }}
        />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#09090b"/>
            <path d="M8 20L14 14L18 18L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="20" r="2" fill="white"/>
            <circle cx="24" cy="12" r="2" fill="white"/>
          </svg>
          <span className="text-2xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
            sippe
          </span>
        </Link>

        {/* Main content */}
        <div className="relative z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#09090b]/20 border border-[#09090b]/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#09090b] animate-pulse" />
              <span className="text-[#09090b] text-xs font-semibold">Gratuito para começar</span>
            </div>
            <h2
              className="text-4xl font-extrabold text-white leading-[1.15] tracking-tight"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Comece a construir
              <br />
              <span className="text-[#09090b]">sua comunidade</span>
              <br />
              hoje mesmo.
            </h2>
            <p className="text-white/50 text-base leading-relaxed mt-4 max-w-xs">
              Junte-se a mais de 15.000 criadores que já usam o Sippe para crescer online.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#09090b]/20 border border-[#09090b]/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#09090b]" />
                </div>
                <span className="text-white/70 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Social proof avatars */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/36?u=sippe-creator-${i}`}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-[#0a0a0a] object-cover"
                  width={36}
                  height={36}
                />
              ))}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">+15.000 criadores</p>
              <p className="text-white/40 text-xs">já criaram sua conta grátis</p>
            </div>
          </div>
        </div>

        <p className="text-white/25 text-xs relative z-10">
          © 2025 Sippe · Feito com 💚 no Brasil
        </p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-lg font-extrabold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
              sippe
            </span>
          </Link>
          <Link href="/" className="text-sm text-[#737373] hover:text-[#0a0a0a] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[400px]">
            <Link href="/" className="hidden lg:inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors mb-10">
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para o início
            </Link>

            <div className="mb-8">
              <h1
                className="text-[2rem] font-extrabold text-[#0a0a0a] mb-2 tracking-tight"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Criar conta grátis
              </h1>
              <p className="text-[#737373] text-sm">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-[#09090b] font-semibold hover:text-[#27272a] transition-colors">
                  Entrar
                </Link>
              </p>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-[#e5e5e5] bg-white hover:bg-[#f5f5f5] text-sm font-medium text-[#0a0a0a] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-[#e5e5e5] bg-white hover:bg-[#f5f5f5] text-sm font-medium text-[#0a0a0a] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#e5e5e5]" />
              <span className="text-xs text-[#a3a3a3] font-medium">ou cadastre-se com e-mail</span>
              <div className="flex-1 h-px bg-[#e5e5e5]" />
            </div>

            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-[#0a0a0a] mb-1.5 block">
                  Nome completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  className="h-11 rounded-xl border-[#e5e5e5] bg-white text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:border-[#09090b] focus:ring-[#09090b]/20"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-[#0a0a0a] mb-1.5 block">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="h-11 rounded-xl border-[#e5e5e5] bg-white text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:border-[#09090b] focus:ring-[#09090b]/20"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-[#0a0a0a] mb-1.5 block">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    className="h-11 rounded-xl border-[#e5e5e5] bg-white text-[#0a0a0a] placeholder:text-[#a3a3a3] focus:border-[#09090b] focus:ring-[#09090b]/20 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#737373] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Link href="/dashboard">
                <Button
                  className="w-full h-12 rounded-xl mt-2 font-semibold text-base"
                  style={{ background: "#09090b", color: "white" }}
                >
                  Criar conta grátis
                </Button>
              </Link>
            </form>

            <p className="text-center text-xs text-[#a3a3a3] mt-8 leading-relaxed">
              Ao criar uma conta, você concorda com os{" "}
              <Link href="#" className="text-[#737373] hover:text-[#0a0a0a] underline underline-offset-2 transition-colors">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-[#737373] hover:text-[#0a0a0a] underline underline-offset-2 transition-colors">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

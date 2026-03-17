"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left — Brand Panel (dark) */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-14 overflow-hidden bg-[#09090b]">
        {/* Subtle grid pattern for texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Minimal glows instead of green blobs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 80% 0%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />

        {/* Header - White Logo Version */}
        <Link href="/" className="flex items-center gap-3 relative z-10 hover:opacity-80 transition-opacity w-fit">
          <Image
            src="/logo-sippe.png"
            alt="Sippe Logo"
            width={130}
            height={40}
            className="w-auto h-10 object-contain invert brightness-0"
            priority
          />
        </Link>

        {/* Main content */}
        <div className="relative z-10 space-y-8 mt-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-wide uppercase">+15.000 criadores ativos</span>
            </div>
            <h2
              className="text-[2.75rem] font-extrabold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Bem-vindo de volta.
              <br />
              <span className="text-white/60">Sua comunidade</span>
              <br />
              sentiu sua falta.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mt-6 max-w-[340px]">
              Continue construindo, aprendendo e conectando com pessoas incríveis ao redor do mundo.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "8.4k+", label: "Comunidades" },
              { value: "24k+", label: "Cursos" },
              { value: "R$120M", label: "Gerado" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 backdrop-blur-md">
                <p className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-md mt-8 w-fit max-w-[400px]">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <p className="text-white/90 text-sm italic leading-relaxed mb-5 font-medium">
              &ldquo;Com o Sippe, minha receita de comunidade cresceu 340% em 6 meses. O design e usabilidade são de outro nível.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?u=testimonial-login"
                alt="Rafael Torres"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#09090b]"
                width={40}
                height={40}
              />
              <div>
                <p className="text-white text-sm font-bold">Rafael Torres</p>
                <p className="text-white/50 text-xs mt-0.5">Empreendedor · 45.2k membros</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-white/30 text-xs font-medium relative z-10 mt-auto pt-12">
          © 2025 Sippe · Feito com cuidado no Brasil
        </p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col bg-[#fcfcfc] overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5] bg-white sticky top-0 z-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-sippe.png"
              alt="Sippe Logo"
              width={100}
              height={32}
              className="w-auto h-8 object-contain"
              priority
            />
          </Link>
          <Link href="/" className="text-sm font-medium text-[#71717a] hover:text-[#09090b] flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[420px]">
            {/* Desktop back link */}
            <Link href="/" className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-[#a1a1aa] hover:text-[#09090b] transition-colors mb-12 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar ao site
            </Link>

            <div className="mb-10">
              <h1
                className="text-3xl font-extrabold text-[#09090b] mb-3 tracking-tight"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Acesse sua conta
              </h1>
              <p className="text-[#71717a] text-[15px]">
                Ainda não tem uma conta?{" "}
                <Link href="/signup" className="text-[#09090b] font-bold hover:underline underline-offset-4 transition-all">
                  Cadastre-se grátis
                </Link>
              </p>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-sm font-bold text-[#09090b] transition-all shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2.5 h-12 rounded-xl border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-sm font-bold text-[#09090b] transition-all shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-[#e4e4e7]" />
              <span className="text-xs text-[#a1a1aa] font-bold uppercase tracking-wider">ou entre com e-mail</span>
              <div className="flex-1 h-px bg-[#e4e4e7]" />
            </div>

            <form className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-bold text-[#09090b] mb-2 block">
                  E-mail de acesso
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@melhoremail.com"
                  className="h-12 rounded-xl border-[#e4e4e7] bg-white text-[#09090b] placeholder:text-[#a1a1aa] focus:border-[#09090b] focus:ring-[#09090b]/20 px-4 shadow-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password" className="text-sm font-bold text-[#09090b]">
                    Senha
                  </Label>
                  <Link href="#" className="text-[13px] text-[#71717a] hover:text-[#09090b] font-bold transition-colors">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-[#e4e4e7] bg-white text-[#09090b] placeholder:text-[#a1a1aa] focus:border-[#09090b] focus:ring-[#09090b]/20 px-4 pr-11 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#09090b] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                className="w-full h-12 rounded-xl mt-4 font-bold text-base bg-[#09090b] text-white hover:bg-[#27272a] hover:shadow-lg hover:shadow-black/10 transition-all hover:-translate-y-0.5"
              >
                Entrar
              </Button>
            </form>

            <p className="text-center text-[13px] text-[#a1a1aa] mt-8 leading-relaxed font-medium">
              Ao acessar, você concorda com nossos{" "}
              <Link href="#" className="text-[#09090b] font-bold hover:underline underline-offset-4 transition-all">
                Termos
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-[#09090b] font-bold hover:underline underline-offset-4 transition-all">
                Privacidade
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

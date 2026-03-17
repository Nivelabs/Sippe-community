"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Lock } from "lucide-react";

/** 
 * Sippe wordmark
 * Uses the dotless 'ı' to perfectly match the custom logo where the chat bubble IS the dot. 
 */
function SippeLogo() {
  return (
    <div
      className="flex items-baseline select-none"
      style={{
        fontFamily: "var(--font-jakarta), sans-serif",
        fontWeight: 800,
        fontSize: "28px",
        letterSpacing: "-0.04em",
        color: "#09090b",
      }}
    >
      <span>S</span>
      <span className="relative inline-flex flex-col items-center">
        {/* Chat bubble SVG — floats exactly where the dot would be */}
        <svg
          className="absolute"
          style={{ bottom: "75%", width: "22px", height: "18px", marginLeft: "1px" }}
          viewBox="0 0 24 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Corpo do balão (elipse) */}
          <ellipse cx="12" cy="9" rx="10" ry="7" fill="#09090b" />
          {/* Rabinho do balão (apontando para baixo, saindo da direita pra esquerda levemente) */}
          <path d="M11 15.5L8.5 19L14 14.5Z" fill="#09090b" />
          {/* Três pontinhos do chat - centralizados */}
          <circle cx="7" cy="9" r="1.5" fill="white" />
          <circle cx="12" cy="9" r="1.5" fill="white" />
          <circle cx="17" cy="9" r="1.5" fill="white" />
        </svg>
        {/* Dotless i */}
        <span>ı</span>
      </span>
      <span>ppe</span>
    </div>
  );
}

const navLinks = [
  { href: "/discover", label: "Explorar" },
  { href: "/#features", label: "Recursos" },
  { href: "/#pricing", label: "Preços" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center w-full px-4 sm:px-6 ${
          scrolled ? "pt-4" : "pt-6"
        }`}
      >
        <div 
          className={`relative flex items-center justify-between transition-all duration-500 ${
            scrolled 
              ? "w-full max-w-5xl h-16 px-6 bg-white/70 backdrop-blur-xl border border-border/80 rounded-full shadow-lg shadow-black/5" 
              : "w-full max-w-7xl h-16 px-2 bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" aria-label="Sippe" className="flex items-center hover:opacity-80 transition-opacity">
            <SippeLogo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground rounded-full hover:bg-black/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5">
                <Lock className="w-4 h-4 mr-2 opacity-50" />
                Entrar
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                className="rounded-full shadow-md shadow-primary/20 bg-primary font-bold px-6 text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 group"
              >
                Começar grátis
                <ChevronRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-full text-foreground hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col pt-28 px-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold text-foreground py-2 border-b border-border/50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 flex flex-col gap-3">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="lg" className="w-full rounded-2xl h-14 font-bold text-lg">
                Entrar na minha conta
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <Button size="lg" className="w-full rounded-2xl h-14 font-bold text-lg bg-primary text-primary-foreground">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

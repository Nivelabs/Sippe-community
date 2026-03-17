"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, Lock } from "lucide-react";

import Image from "next/image";

function SippeLogo() {
  return (
    <div className="flex items-center select-none pl-1">
      <Image
        src="/logo-sippe.png"
        alt="Sippe Logo"
        width={130}
        height={40}
        className="w-auto h-9 sm:h-10 object-contain"
        priority
      />
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
            <Link href="/signup">
              <Button
                className="rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 border border-black/5 bg-[#09090b] text-white font-bold h-10 px-7 transition-all flex items-center gap-1 group"
              >
                Começar agora
                <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
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

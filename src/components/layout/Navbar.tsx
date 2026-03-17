"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/discover", label: "Explorar" },
  { href: "/#features", label: "Recursos" },
  { href: "/#pricing", label: "Preços" },
];

// Logo SVG inline — bolha de chat no "i" como no logo oficial
function SippeLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {/* Chat bubble icon */}
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="8" fill={dark ? "#ffffff" : "#0a0a0a"} />
        <rect x="7" y="8" width="16" height="11" rx="4" fill={dark ? "#0a0a0a" : "#ffffff"} />
        <circle cx="11" cy="13.5" r="1.2" fill={dark ? "#ffffff" : "#0a0a0a"} />
        <circle cx="15" cy="13.5" r="1.2" fill={dark ? "#ffffff" : "#0a0a0a"} />
        <circle cx="19" cy="13.5" r="1.2" fill={dark ? "#ffffff" : "#0a0a0a"} />
        <path d="M11 19l2 3 2-3" fill={dark ? "#0a0a0a" : "#ffffff"} />
      </svg>
      <span
        className="text-xl font-extrabold tracking-tight"
        style={{
          fontFamily: "var(--font-jakarta)",
          color: dark ? "#ffffff" : "#0a0a0a",
        }}
      >
        sippe
      </span>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5]">
      <div className="container-narrow flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Sippe - Início">
          <SippeLogo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-[#737373] hover:text-[#0a0a0a] rounded-lg hover:bg-[#f5f5f5] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-medium text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5]">
              Entrar
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="rounded-full font-semibold px-5 shadow-sm"
              style={{ background: "#0a0a0a", color: "white" }}
            >
              Começar grátis
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] bg-white px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm font-medium text-[#0a0a0a] hover:bg-[#f5f5f5] rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-[#e5e5e5] mt-2">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full font-medium border-[#e5e5e5]">
                Entrar
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <Button
                className="w-full rounded-full font-semibold"
                style={{ background: "#0a0a0a", color: "white" }}
              >
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

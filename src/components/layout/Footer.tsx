import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Produto: [
    { label: "Explorar", href: "/discover" },
    { label: "Recursos", href: "/#features" },
    { label: "Preços", href: "/#pricing" },
    { label: "Changelog", href: "#" },
  ],
  Empresa: [
    { label: "Sobre nós", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carreiras", href: "#" },
    { label: "Contato", href: "#" },
  ],
  Suporte: [
    { label: "Central de ajuda", href: "#" },
    { label: "Documentação", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacidade", href: "#" },
    { label: "Termos de uso", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

/** Compact logo for dark footer */
function FooterLogo() {
  return (
    <div className="flex items-center select-none hover:opacity-80 transition-opacity">
      <Image
        src="/logo-sippe.png"
        alt="Sippe Logo"
        width={100}
        height={32}
        className="w-auto h-8 lg:h-9 object-contain brightness-0 invert"
        priority
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#222]">
      <div className="container-narrow py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <FooterLogo />
            </Link>
            <p className="text-[15px] text-white/50 leading-relaxed max-w-[260px]">
              A nova casa das suas comunidades digitais. A plataforma definitiva para criadores de conteúdo Premium.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h4
                className="text-[13px] font-bold text-white mb-5 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {category}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#222] mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/30 font-medium">
            © 2025 Sippe · Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-[13px] text-white/30 hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="text-[13px] text-white/30 hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

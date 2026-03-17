import Link from "next/link";

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

/** Compact logo for footer */
function FooterLogo() {
  return (
    <div
      className="flex items-baseline gap-0 select-none"
      style={{
        fontFamily: "var(--font-space-grotesk)",
        fontWeight: 700,
        fontSize: "1.125rem",
        letterSpacing: "-0.03em",
        color: "#111111",
      }}
    >
      <span>S</span>
      <span className="relative inline-block">
        <svg
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "100%", marginBottom: "1px", width: "14px", height: "10px" }}
          viewBox="0 0 14 10"
          fill="none"
        >
          <rect width="14" height="7.5" rx="3" fill="#111111" />
          <path d="M4.5 7.5L7 10L9.5 7.5H4.5Z" fill="#111111" />
          <circle cx="3.5" cy="3.75" r="1" fill="white" />
          <circle cx="7" cy="3.75" r="1" fill="white" />
          <circle cx="10.5" cy="3.75" r="1" fill="white" />
        </svg>
        i
      </span>
      <span>ppe</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E5E5]">
      <div className="container-narrow py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <FooterLogo />
            </Link>
            <p className="text-xs text-[#999] leading-relaxed max-w-[180px]">
              A plataforma para criadores que querem crescer.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs font-semibold text-[#111] mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#999] hover:text-[#111] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#E5E5E5] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#BBBBBB]">
            © 2025 Sippe. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#BBBBBB]">
            Feito com 💚 no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}

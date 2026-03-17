import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div
          className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #14532d 0%, #15803d 50%, #16a34a 100%)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #fff 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #fff 0%, transparent 70%)",
              transform: "translate(-40%, 40%)",
            }}
          />

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
              🚀 Comece hoje mesmo
            </span>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Pronto para construir sua
              <br />
              comunidade dos sonhos?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Junte-se a mais de 15.000 criadores que já usam o Sippe para crescer,
              ensinar e monetizar suas comunidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-green-400 transition-colors text-base shadow-lg group">
                  Criar minha comunidade
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/discover">
                <button className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-colors text-base backdrop-blur-sm border border-white/20">
                  Explorar comunidades
                </button>
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-6">
              Sem cartão de crédito · Setup em 5 minutos · Cancele quando quiser
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

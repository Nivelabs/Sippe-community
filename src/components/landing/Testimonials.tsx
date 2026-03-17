import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";

function formatMembers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-[#09090b] text-sm font-semibold mb-4">
            Depoimentos
          </span>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-heading mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Criadores que{" "}
            <span className="text-[#09090b]">já confiam</span> no Sippe
          </h2>
          <p className="text-muted-foreground text-lg">
            Histórias reais de pessoas que construíram comunidades incríveis.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-muted rounded-3xl p-6 border border-border flex flex-col relative"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 text-[#09090b]/10">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-[#09090b]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-[#09090b]">
                    {formatMembers(t.members)} membros
                  </p>
                  <p className="text-xs text-muted-foreground">{t.community}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

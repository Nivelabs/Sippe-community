"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  BookOpen,
  Zap,
  Globe,
  Lock,
  DollarSign,
  ImagePlus,
  Check,
} from "lucide-react";

const STEPS = ["Básico", "Detalhes", "Plano", "Finalizar"];

const CATEGORY_OPTIONS = [
  { label: "Tecnologia", emoji: "💻" },
  { label: "Design", emoji: "🎨" },
  { label: "Marketing", emoji: "📢" },
  { label: "Negócios", emoji: "💼" },
  { label: "Educação", emoji: "📚" },
  { label: "Saúde", emoji: "🏃" },
  { label: "Arte", emoji: "🖼️" },
  { label: "Música", emoji: "🎵" },
  { label: "Esportes", emoji: "⚽" },
  { label: "Culinária", emoji: "🍳" },
];

const PRIVACY_OPTIONS = [
  {
    value: "public",
    icon: Globe,
    title: "Pública",
    desc: "Qualquer pessoa pode ver e entrar",
  },
  {
    value: "private",
    icon: Lock,
    title: "Privada",
    desc: "Apenas membros aprovados podem entrar",
  },
];

const PLAN_OPTIONS = [
  {
    value: "free",
    icon: Users,
    title: "Gratuita",
    desc: "Comunidade 100% grátis para os membros",
    badge: null,
  },
  {
    value: "paid",
    icon: DollarSign,
    title: "Paga",
    desc: "Cobre uma mensalidade dos membros",
    badge: "Popular",
  },
];

export default function CreateCommunityPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    privacy: "public",
    plan: "free",
    price: "",
    coverPreview: null as string | null,
    avatarPreview: null as string | null,
  });
  const coverRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverPreview" | "avatarPreview"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, [field]: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const isStepValid = () => {
    if (step === 0) return form.name.length >= 3 && form.description.length >= 10;
    if (step === 1) return form.category !== "";
    return true;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e5e5] h-14 flex items-center px-4 sticky top-0 z-20">
        <Link href="/dashboard" className="flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] transition-colors mr-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Cancelar</span>
        </Link>
        <div className="flex-1 text-center">
          <p className="text-sm font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Criar Comunidade
          </p>
        </div>
        <div className="w-16" />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress steps */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < step
                      ? "bg-[#1db954] text-white"
                      : i === step
                      ? "bg-[#0a0a0a] text-white"
                      : "bg-[#e5e5e5] text-[#a3a3a3]"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[10px] font-medium mt-1 ${i === step ? "text-[#0a0a0a]" : "text-[#a3a3a3]"}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${i < step ? "bg-[#1db954]" : "bg-[#e5e5e5]"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Básico */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                Informações básicas
              </h2>
              <p className="text-sm text-[#737373]">O nome e a descrição são o rosto da sua comunidade.</p>
            </div>

            {/* Cover upload */}
            <div>
              <Label className="text-sm font-medium text-[#0a0a0a] mb-2 block">Capa da comunidade</Label>
              <div
                className="relative h-36 rounded-xl border-2 border-dashed border-[#e5e5e5] overflow-hidden cursor-pointer hover:border-[#1db954] transition-colors group"
                onClick={() => coverRef.current?.click()}
              >
                {form.coverPreview ? (
                  <img src={form.coverPreview} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <ImagePlus className="w-8 h-8 text-[#a3a3a3] group-hover:text-[#1db954] transition-colors" />
                    <span className="text-xs text-[#a3a3a3]">Clique para adicionar uma capa</span>
                  </div>
                )}
                <input
                  ref={coverRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "coverPreview")}
                />
              </div>
            </div>

            {/* Avatar upload */}
            <div>
              <Label className="text-sm font-medium text-[#0a0a0a] mb-2 block">Ícone / Avatar</Label>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl border-2 border-dashed border-[#e5e5e5] overflow-hidden cursor-pointer hover:border-[#1db954] transition-colors flex items-center justify-center group"
                  onClick={() => avatarRef.current?.click()}
                >
                  {form.avatarPreview ? (
                    <img src={form.avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <ImagePlus className="w-6 h-6 text-[#a3a3a3] group-hover:text-[#1db954] transition-colors" />
                  )}
                  <input
                    ref={avatarRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, "avatarPreview")}
                  />
                </div>
                <p className="text-xs text-[#a3a3a3] leading-relaxed">
                  Use uma imagem quadrada.<br />Recomendado: 400x400px
                </p>
              </div>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-[#0a0a0a] mb-1.5 block">
                Nome da comunidade *
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Dev Fullstack Brasil"
                className="h-11 rounded-xl border-[#e5e5e5]"
                maxLength={40}
              />
              <p className="text-xs text-[#a3a3a3] text-right mt-1">{form.name.length}/40</p>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="desc" className="text-sm font-medium text-[#0a0a0a] mb-1.5 block">
                Descrição *
              </Label>
              <textarea
                id="desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descreva sua comunidade em poucas palavras..."
                className="w-full h-24 px-4 py-3 rounded-xl border border-[#e5e5e5] text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3] outline-none focus:border-[#1db954] resize-none transition-colors"
                maxLength={200}
              />
              <p className="text-xs text-[#a3a3a3] text-right mt-1">{form.description.length}/200</p>
            </div>
          </div>
        )}

        {/* Step 1: Detalhes */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                Categoria e privacidade
              </h2>
              <p className="text-sm text-[#737373]">Ajude as pessoas a encontrar sua comunidade.</p>
            </div>

            {/* Category */}
            <div>
              <Label className="text-sm font-medium text-[#0a0a0a] mb-3 block">Categoria *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setForm({ ...form, category: cat.label })}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      form.category === cat.label
                        ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                        : "border-[#e5e5e5] bg-white text-[#737373] hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div>
              <Label className="text-sm font-medium text-[#0a0a0a] mb-3 block">Privacidade</Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {PRIVACY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm({ ...form, privacy: opt.value })}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                      form.privacy === opt.value
                        ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                        : "border-[#e5e5e5] bg-white hover:border-[#d4d4d4]"
                    }`}
                  >
                    <opt.icon className={`w-5 h-5 mt-0.5 shrink-0 ${form.privacy === opt.value ? "text-white" : "text-[#737373]"}`} />
                    <div>
                      <p className={`text-sm font-semibold ${form.privacy === opt.value ? "text-white" : "text-[#0a0a0a]"}`}>
                        {opt.title}
                      </p>
                      <p className={`text-xs mt-0.5 ${form.privacy === opt.value ? "text-white/70" : "text-[#a3a3a3]"}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Plano */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                Modelo de monetização
              </h2>
              <p className="text-sm text-[#737373]">Escolha como você quer monetizar sua comunidade.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {PLAN_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setForm({ ...form, plan: opt.value })}
                  className={`relative flex flex-col gap-3 p-5 rounded-2xl border text-left transition-all ${
                    form.plan === opt.value
                      ? "border-[#1db954] bg-[#f0fdf4]"
                      : "border-[#e5e5e5] bg-white hover:border-[#d4d4d4]"
                  }`}
                >
                  {opt.badge && (
                    <span className="absolute top-3 right-3 bg-[#1db954] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {opt.badge}
                    </span>
                  )}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: form.plan === opt.value ? "#1db95420" : "#f5f5f5" }}
                  >
                    <opt.icon className="w-5 h-5 text-[#1db954]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0a0a0a]">{opt.title}</p>
                    <p className="text-xs text-[#a3a3a3] mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {form.plan === "paid" && (
              <div>
                <Label htmlFor="price" className="text-sm font-medium text-[#0a0a0a] mb-1.5 block">
                  Preço mensal (R$)
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#737373]">R$</span>
                  <Input
                    id="price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="49,90"
                    className="h-11 rounded-xl border-[#e5e5e5] pl-10"
                  />
                </div>
                <p className="text-xs text-[#a3a3a3] mt-2">
                  O Sippe retém 10% das receitas como taxa de plataforma.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Finalizar */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#0a0a0a] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                Tudo pronto! 🚀
              </h2>
              <p className="text-sm text-[#737373]">Revise as informações antes de criar sua comunidade.</p>
            </div>

            {/* Preview card */}
            <div className="rounded-2xl border border-[#e5e5e5] overflow-hidden">
              <div
                className="h-28 relative"
                style={{
                  background: form.coverPreview
                    ? `url(${form.coverPreview}) center/cover`
                    : "linear-gradient(135deg, #0a0a0a 0%, #1db954 100%)",
                }}
              />
              <div className="p-4">
                <div className="flex items-start gap-3 -mt-8 mb-3">
                  <div className="w-14 h-14 rounded-xl border-4 border-white shadow-md overflow-hidden bg-[#1db954] flex items-center justify-center">
                    {form.avatarPreview ? (
                      <img src={form.avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Zap className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-[#0a0a0a]">{form.name || "Nome da comunidade"}</h3>
                <p className="text-xs text-[#737373] mt-1">{form.description || "Descrição da comunidade..."}</p>
                <div className="flex items-center gap-2 mt-3">
                  {form.category && (
                    <span className="px-3 py-1 bg-[#f5f5f5] rounded-full text-xs font-medium text-[#737373]">
                      {form.category}
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    form.plan === "free"
                      ? "bg-[#f0fdf4] text-[#1db954]"
                      : "bg-[#fef3c7] text-[#d97706]"
                  }`}>
                    {form.plan === "free" ? "Grátis" : `R$ ${form.price}/mês`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#f0fdf4] rounded-xl border border-[#1db954]/20">
              <Check className="w-5 h-5 text-[#1db954] shrink-0 mt-0.5" />
              <p className="text-sm text-[#166534]">
                Sua comunidade será criada imediatamente e você poderá personalizar tudo em seguida.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="rounded-xl border-[#e5e5e5] disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />Anterior
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!isStepValid()}
              className="rounded-xl disabled:opacity-30"
              style={{ background: "#0a0a0a", color: "white" }}
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button
                className="rounded-xl font-bold px-6"
                style={{ background: "#1db954", color: "white" }}
              >
                Criar comunidade 🚀
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

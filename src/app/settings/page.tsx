"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Shield,
  Camera,
  Check,
  Trash2,
  LogOut,
  Moon,
  Globe,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";
import { CURRENT_USER } from "@/lib/mock-data";

const TABS = [
  { id: "profile", icon: User, label: "Perfil" },
  { id: "account", icon: Lock, label: "Conta" },
  { id: "privacy", icon: Shield, label: "Privacidade" },
  { id: "notifications", icon: Bell, label: "Notificações" },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex w-11 h-6 rounded-full transition-colors shrink-0 ${
        checked ? "bg-[#09090b]" : "bg-[#d4d4d4]"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SettingRow({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#0a0a0a]">{title}</p>
        {desc && <p className="text-xs text-[#a3a3a3] mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const user = CURRENT_USER;
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [profileForm, setProfileForm] = useState({
    fullName: user.fullName,
    username: user.username,
    bio: user.bio,
    location: user.location,
    website: user.website,
  });

  const [notifications, setNotifications] = useState({
    emailNewPost: true,
    emailNewMember: false,
    emailEvents: true,
    pushAll: true,
    pushMentions: true,
    pushMessages: true,
    pushEvents: false,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showEmail: false,
    showActivity: true,
    allowMessages: true,
    twoFactor: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setNotif = (key: keyof typeof notifications, val: boolean) =>
    setNotifications((p) => ({ ...p, [key]: val }));

  const setPriv = (key: keyof typeof privacy, val: boolean) =>
    setPrivacy((p) => ({ ...p, [key]: val }));

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e5e5] h-14 flex items-center px-4 sticky top-0 z-20">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] transition-colors mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Dashboard</span>
        </Link>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-jakarta)" }}>
            Configurações
          </p>
        </div>
        {/* Mobile tab selector */}
        <button
          className="sm:hidden flex items-center gap-1.5 text-xs font-medium text-[#737373] border border-[#e5e5e5] px-3 py-1.5 rounded-lg"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          {TABS.find((t) => t.id === activeTab)?.label}
          <ChevronRight className={`w-3 h-3 transition-transform ${mobileSidebarOpen ? "rotate-90" : ""}`} />
        </button>
      </header>

      {/* Mobile tab dropdown */}
      {mobileSidebarOpen && (
        <div className="sm:hidden bg-white border-b border-[#e5e5e5] px-4 py-2 flex gap-2 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMobileSidebarOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#0a0a0a] text-white"
                  : "bg-[#f5f5f5] text-[#737373]"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar nav */}
          <aside className="hidden sm:flex flex-col w-52 shrink-0 gap-1 sticky top-20 self-start">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? "bg-[#0a0a0a] text-white"
                    : "text-[#737373] hover:bg-white hover:text-[#0a0a0a]"
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            ))}
            <Separator className="my-3" />
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <>
                <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
                  <h2 className="text-base font-bold text-[#0a0a0a] mb-5">Informações do perfil</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-5 mb-6 pb-6 border-b border-[#f5f5f5]">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={user.avatar} alt={user.fullName} />
                        <AvatarFallback className="text-xl font-bold">{user.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#0a0a0a] rounded-full flex items-center justify-center hover:bg-[#333] transition-colors">
                        <Camera className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0a0a0a]">{user.fullName}</p>
                      <p className="text-xs text-[#a3a3a3] mb-2">@{user.username}</p>
                      <button className="text-xs font-medium text-[#09090b] hover:underline">
                        Alterar foto
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-xs font-medium text-[#737373] mb-1.5 block">Nome completo</Label>
                      <Input
                        value={profileForm.fullName}
                        onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                        className="h-11 rounded-xl border-[#e5e5e5]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#737373] mb-1.5 block">Nome de usuário</Label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#a3a3a3]">@</span>
                        <Input
                          value={profileForm.username}
                          onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                          className="h-11 rounded-xl border-[#e5e5e5] pl-8"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-xs font-medium text-[#737373] mb-1.5 block">Bio</Label>
                      <textarea
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full h-20 px-4 py-3 rounded-xl border border-[#e5e5e5] text-sm text-[#0a0a0a] outline-none focus:border-[#09090b] resize-none transition-colors"
                        maxLength={200}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#737373] mb-1.5 block">Localização</Label>
                      <Input
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="São Paulo, Brasil"
                        className="h-11 rounded-xl border-[#e5e5e5]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#737373] mb-1.5 block">Website</Label>
                      <Input
                        value={profileForm.website}
                        onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                        placeholder="meusite.com"
                        className="h-11 rounded-xl border-[#e5e5e5]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-5 pt-5 border-t border-[#f5f5f5]">
                    <Button
                      onClick={handleSave}
                      className="rounded-xl px-6 font-semibold gap-2"
                      style={{ background: saved ? "#09090b" : "#0a0a0a", color: "white" }}
                    >
                      {saved ? (
                        <>
                          <Check className="w-4 h-4" /> Salvo!
                        </>
                      ) : (
                        "Salvar alterações"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* ACCOUNT TAB */}
            {activeTab === "account" && (
              <>
                <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
                  <h2 className="text-base font-bold text-[#0a0a0a] mb-5">E-mail e senha</h2>
                  <div className="space-y-5">
                    <div>
                      <Label className="text-xs font-medium text-[#737373] mb-1.5 block">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                        <Input
                          defaultValue="nathanisaac@email.com"
                          className="h-11 rounded-xl border-[#e5e5e5] pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-[#737373] mb-1.5 block">Nova senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••"
                          className="h-11 rounded-xl border-[#e5e5e5] pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#737373]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-5 pt-5 border-t border-[#f5f5f5]">
                    <Button
                      onClick={handleSave}
                      className="rounded-xl px-6 font-semibold gap-2"
                      style={{ background: saved ? "#09090b" : "#0a0a0a", color: "white" }}
                    >
                      {saved ? <><Check className="w-4 h-4" /> Salvo!</> : "Salvar"}
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
                  <h2 className="text-base font-bold text-[#0a0a0a] mb-1">Preferências</h2>
                  <div className="divide-y divide-[#f5f5f5]">
                    <SettingRow title="Tema escuro" desc="Ativar modo dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-[#a3a3a3]" />
                        <Toggle checked={false} onChange={() => {}} />
                      </div>
                    </SettingRow>
                    <SettingRow title="Idioma" desc="Idioma da interface">
                      <div className="flex items-center gap-2 text-sm text-[#737373]">
                        <Globe className="w-4 h-4" />
                        <span>Português</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </SettingRow>
                    <SettingRow title="App móvel" desc="Baixar o app do Sippe">
                      <div className="flex items-center gap-2 text-sm text-[#09090b]">
                        <Smartphone className="w-4 h-4" />
                        <span className="font-medium">Em breve</span>
                      </div>
                    </SettingRow>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-red-100 p-6">
                  <h2 className="text-base font-bold text-red-600 mb-1">Zona de perigo</h2>
                  <p className="text-xs text-[#a3a3a3] mb-4">
                    Ações irreversíveis que afetam permanentemente sua conta.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="rounded-xl gap-2 border-red-200 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                      Sair de todos os dispositivos
                    </Button>
                    <Button variant="outline" className="rounded-xl gap-2 border-red-300 text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                      Excluir minha conta
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* PRIVACY TAB */}
            {activeTab === "privacy" && (
              <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
                <h2 className="text-base font-bold text-[#0a0a0a] mb-1">Privacidade e segurança</h2>
                <div className="divide-y divide-[#f5f5f5]">
                  <SettingRow title="Perfil público" desc="Qualquer pessoa pode ver seu perfil">
                    <Toggle checked={privacy.publicProfile} onChange={(v) => setPriv("publicProfile", v)} />
                  </SettingRow>
                  <SettingRow title="Mostrar e-mail" desc="Visível para outros membros">
                    <Toggle checked={privacy.showEmail} onChange={(v) => setPriv("showEmail", v)} />
                  </SettingRow>
                  <SettingRow title="Mostrar atividade" desc="Exibir quando você está online">
                    <Toggle checked={privacy.showActivity} onChange={(v) => setPriv("showActivity", v)} />
                  </SettingRow>
                  <SettingRow title="Receber mensagens" desc="Permitir mensagens de outros membros">
                    <Toggle checked={privacy.allowMessages} onChange={(v) => setPriv("allowMessages", v)} />
                  </SettingRow>
                  <SettingRow
                    title="Autenticação 2 fatores"
                    desc="Recomendado: adiciona uma camada de segurança"
                  >
                    <Toggle checked={privacy.twoFactor} onChange={(v) => setPriv("twoFactor", v)} />
                  </SettingRow>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <>
                <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
                  <h2 className="text-base font-bold text-[#0a0a0a] mb-1.5">Notificações por e-mail</h2>
                  <div className="divide-y divide-[#f5f5f5]">
                    <SettingRow title="Novo post na comunidade" desc="Quando alguém publicar">
                      <Toggle checked={notifications.emailNewPost} onChange={(v) => setNotif("emailNewPost", v)} />
                    </SettingRow>
                    <SettingRow title="Novo membro" desc="Quando alguém entrar na sua comunidade">
                      <Toggle checked={notifications.emailNewMember} onChange={(v) => setNotif("emailNewMember", v)} />
                    </SettingRow>
                    <SettingRow title="Eventos" desc="Lembretes de eventos">
                      <Toggle checked={notifications.emailEvents} onChange={(v) => setNotif("emailEvents", v)} />
                    </SettingRow>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
                  <h2 className="text-base font-bold text-[#0a0a0a] mb-1.5">Notificações push</h2>
                  <div className="divide-y divide-[#f5f5f5]">
                    <SettingRow title="Todas as notificações" desc="Liga/desliga tudo">
                      <Toggle checked={notifications.pushAll} onChange={(v) => setNotif("pushAll", v)} />
                    </SettingRow>
                    <SettingRow title="Menções" desc="Quando alguém te mencionar">
                      <Toggle checked={notifications.pushMentions} onChange={(v) => setNotif("pushMentions", v)} />
                    </SettingRow>
                    <SettingRow title="Mensagens diretas" desc="Novas mensagens">
                      <Toggle checked={notifications.pushMessages} onChange={(v) => setNotif("pushMessages", v)} />
                    </SettingRow>
                    <SettingRow title="Eventos" desc="Avisos de eventos próximos">
                      <Toggle checked={notifications.pushEvents} onChange={(v) => setNotif("pushEvents", v)} />
                    </SettingRow>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

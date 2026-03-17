'use client';

import { useState } from 'react';
import { signUpAction } from '@/lib/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react';

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await signUpAction(formData);

    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || 'Erro ao criar conta');
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Conta criada com sucesso!</h3>
        <p className="text-muted-foreground">
          Verifique seu email para confirmar sua conta.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="full_name">Nome completo</Label>
        <Input
          id="full_name"
          name="full_name"
          type="text"
          placeholder="João Silva"
          required
          disabled={loading}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="signup_email">Email</Label>
        <Input
          id="signup_email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          required
          disabled={loading}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="signup_password">Senha</Label>
        <Input
          id="signup_password"
          name="password"
          type="password"
          placeholder="••••••••"
          minLength={6}
          required
          disabled={loading}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">Mínimo de 6 caracteres</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#09090b] text-white rounded-full font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Criando conta...' : 'Criar conta'}
      </button>
    </form>
  );
}

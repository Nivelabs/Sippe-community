'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { signOutAction } from '@/lib/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Plus } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import Link from 'next/link';

export default function UserMenu() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          Entrar
        </Link>
        <Link
          href="/login?tab=signup"
          className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
        >
          Começar grátis
        </Link>
      </div>
    );
  }

  const userMetadata = user.user_metadata;
  const displayName = userMetadata?.full_name || user.email?.split('@')[0] || 'Usuário';
  const avatarUrl = userMetadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Avatar className="w-9 h-9">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="bg-primary text-white text-sm font-semibold">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-semibold">{displayName}</span>
            <span className="text-xs text-muted-foreground font-normal">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/profile" className="cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            Meu perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/communities/new" className="cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Criar comunidade
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOutAction()}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

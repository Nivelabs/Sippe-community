'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

type ActionResponse = {
  success: boolean;
  error?: string;
};

/**
 * Sign up with email and password
 */
export async function signUpAction(formData: FormData): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('full_name') as string;

    if (!email || !password) {
      return { success: false, error: 'Email e senha são obrigatórios' };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Error signing up:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar conta',
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signInAction(formData: FormData): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { success: false, error: 'Email e senha são obrigatórios' };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/discover');
  } catch (error) {
    console.error('Error signing in:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao fazer login',
    };
  }
}

/**
 * Sign out
 */
export async function signOutAction(): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/');
  } catch (error) {
    console.error('Error signing out:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao sair',
    };
  }
}

/**
 * Sign in with OAuth (Google, GitHub, etc)
 */
export async function signInWithOAuthAction(provider: 'google' | 'github') {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.url) {
      redirect(data.url);
    }
  } catch (error) {
    console.error('Error signing in with OAuth:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao fazer login',
    };
  }
}

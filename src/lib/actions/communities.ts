'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CommunityRepository } from '@/lib/repositories/communities';
import { createCommunitySchema, updateCommunitySchema } from '@/lib/schemas/community';
import { slugify } from '@/lib/utils';

type ActionResponse<T = void> = {
  success: boolean;
  error?: string;
  data?: T;
};

/**
 * Create a new community
 */
export async function createCommunityAction(
  formData: FormData
): Promise<ActionResponse<{ slug: string }>> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Você precisa estar autenticado' };
    }

    // Parse and validate data
    const rawData = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string || slugify(formData.get('name') as string),
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')) || 0,
      is_private: formData.get('is_private') === 'true',
      cover_url: formData.get('cover_url') as string || null,
      avatar_url: formData.get('avatar_url') as string || null,
    };

    const validated = createCommunitySchema.parse(rawData);

    // Check if slug is available
    const existing = await CommunityRepository.getBySlug(validated.slug);
    if (existing) {
      return { success: false, error: 'Este slug já está em uso' };
    }

    // Create community
    const community = await CommunityRepository.create(validated, user.id);

    // Revalidate paths
    revalidatePath('/discover');
    revalidatePath('/');

    return { success: true, data: { slug: community.slug } };
  } catch (error) {
    console.error('Error creating community:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar comunidade',
    };
  }
}

/**
 * Update community
 */
export async function updateCommunityAction(
  communityId: string,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Você precisa estar autenticado' };
    }

    // Check ownership
    const community = await CommunityRepository.getById(communityId);
    if (!community || community.owner_id !== user.id) {
      return { success: false, error: 'Você não tem permissão para editar esta comunidade' };
    }

    // Parse and validate data
    const rawData: Record<string, unknown> = {};
    if (formData.get('name')) rawData.name = formData.get('name');
    if (formData.get('description')) rawData.description = formData.get('description');
    if (formData.get('category')) rawData.category = formData.get('category');
    if (formData.get('price')) rawData.price = Number(formData.get('price'));
    if (formData.get('cover_url')) rawData.cover_url = formData.get('cover_url');
    if (formData.get('avatar_url')) rawData.avatar_url = formData.get('avatar_url');

    const validated = updateCommunitySchema.parse(rawData);

    // Update community
    await CommunityRepository.update(communityId, validated);

    // Revalidate paths
    revalidatePath(`/c/${community.slug}`);
    revalidatePath('/discover');

    return { success: true };
  } catch (error) {
    console.error('Error updating community:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar comunidade',
    };
  }
}

/**
 * Join a community
 */
export async function joinCommunityAction(communityId: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Você precisa estar autenticado' };
    }

    // Check if already member
    const isMember = await CommunityRepository.isMember(communityId, user.id);
    if (isMember) {
      return { success: false, error: 'Você já é membro desta comunidade' };
    }

    // Join community
    await CommunityRepository.join(communityId, user.id);

    // Get community slug for revalidation
    const community = await CommunityRepository.getById(communityId);
    if (community) {
      revalidatePath(`/c/${community.slug}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error joining community:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao entrar na comunidade',
    };
  }
}

/**
 * Leave a community
 */
export async function leaveCommunityAction(communityId: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Você precisa estar autenticado' };
    }

    // Check if member
    const isMember = await CommunityRepository.isMember(communityId, user.id);
    if (!isMember) {
      return { success: false, error: 'Você não é membro desta comunidade' };
    }

    // Check if owner (owners can't leave their own communities)
    const community = await CommunityRepository.getById(communityId);
    if (community?.owner_id === user.id) {
      return { success: false, error: 'Você não pode sair da sua própria comunidade' };
    }

    // Leave community
    await CommunityRepository.leave(communityId, user.id);

    // Revalidate paths
    if (community) {
      revalidatePath(`/c/${community.slug}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error leaving community:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao sair da comunidade',
    };
  }
}

/**
 * Delete a community (owner only)
 */
export async function deleteCommunityAction(communityId: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Você precisa estar autenticado' };
    }

    // Check ownership
    const community = await CommunityRepository.getById(communityId);
    if (!community || community.owner_id !== user.id) {
      return { success: false, error: 'Você não tem permissão para deletar esta comunidade' };
    }

    // Delete community
    await CommunityRepository.delete(communityId);

    // Revalidate paths
    revalidatePath('/discover');
    revalidatePath('/');

    // Redirect to discover page
    redirect('/discover');
  } catch (error) {
    console.error('Error deleting community:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar comunidade',
    };
  }
}

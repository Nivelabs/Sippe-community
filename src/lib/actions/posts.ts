'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { PostRepository } from '@/lib/repositories/posts';
import { CommunityRepository } from '@/lib/repositories/communities';
import { createPostSchema, updatePostSchema, createCommentSchema } from '@/lib/schemas/post';

type ActionResponse<T = void> = {
  success: boolean;
  error?: string;
  data?: T;
};

/**
 * Create a new post
 */
export async function createPostAction(
  communitySlug: string,
  formData: FormData
): Promise<ActionResponse<{ postId: string }>> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Você precisa estar autenticado' };
    }

    // Get community
    const community = await CommunityRepository.getBySlug(communitySlug);
    if (!community) {
      return { success: false, error: 'Comunidade não encontrada' };
    }

    // Check if user is member
    const isMember = await CommunityRepository.isMember(community.id, user.id);
    if (!isMember) {
      return { success: false, error: 'Você precisa ser membro para postar' };
    }

    // Parse and validate data
    const rawData = {
      community_id: community.id,
      content: formData.get('content') as string,
      image_url: formData.get('image_url') as string || null,
    };

    const validated = createPostSchema.parse(rawData);

    // Create post
    const post = await PostRepository.create(validated, user.id);

    // Revalidate community page
    revalidatePath(`/c/${communitySlug}`);

    return { success: true, data: { postId: post.id } };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return {
      success: false,
      error: error.message || 'Erro ao criar post',
    };
  }
}

/**
 * Update a post
 */
export async function updatePostAction(
  postId: string,
  communitySlug: string,
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

    // Get post
    const post = await PostRepository.getById(postId);
    if (!post || post.author_id !== user.id) {
      return { success: false, error: 'Você não tem permissão para editar este post' };
    }

    // Parse and validate data
    const rawData: any = {};
    if (formData.get('content')) rawData.content = formData.get('content');
    if (formData.get('image_url') !== undefined) rawData.image_url = formData.get('image_url');

    const validated = updatePostSchema.parse(rawData);

    // Update post
    await PostRepository.update(postId, validated);

    // Revalidate community page
    revalidatePath(`/c/${communitySlug}`);

    return { success: true };
  } catch (error: any) {
    console.error('Error updating post:', error);
    return {
      success: false,
      error: error.message || 'Erro ao atualizar post',
    };
  }
}

/**
 * Delete a post
 */
export async function deletePostAction(
  postId: string,
  communitySlug: string
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

    // Get post
    const post = await PostRepository.getById(postId);
    if (!post) {
      return { success: false, error: 'Post não encontrado' };
    }

    // Check if user is author or community owner
    const community = await CommunityRepository.getBySlug(communitySlug);
    const isAuthor = post.author_id === user.id;
    const isOwner = community?.owner_id === user.id;

    if (!isAuthor && !isOwner) {
      return { success: false, error: 'Você não tem permissão para deletar este post' };
    }

    // Delete post
    await PostRepository.delete(postId);

    // Revalidate community page
    revalidatePath(`/c/${communitySlug}`);

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return {
      success: false,
      error: error.message || 'Erro ao deletar post',
    };
  }
}

/**
 * Toggle like on a post
 */
export async function toggleLikeAction(
  postId: string,
  communitySlug: string,
  currentlyLiked: boolean
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

    // Toggle like
    if (currentlyLiked) {
      await PostRepository.unlike(postId, user.id);
    } else {
      await PostRepository.like(postId, user.id);
    }

    // Revalidate community page
    revalidatePath(`/c/${communitySlug}`);

    return { success: true };
  } catch (error: any) {
    console.error('Error toggling like:', error);
    return {
      success: false,
      error: error.message || 'Erro ao curtir post',
    };
  }
}

/**
 * Create a comment
 */
export async function createCommentAction(
  postId: string,
  communitySlug: string,
  formData: FormData
): Promise<ActionResponse<{ commentId: string }>> {
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
      post_id: postId,
      content: formData.get('content') as string,
    };

    const validated = createCommentSchema.parse(rawData);

    // Create comment
    const comment = await PostRepository.createComment(validated, user.id);

    // Revalidate community page
    revalidatePath(`/c/${communitySlug}`);

    return { success: true, data: { commentId: comment.id } };
  } catch (error: any) {
    console.error('Error creating comment:', error);
    return {
      success: false,
      error: error.message || 'Erro ao comentar',
    };
  }
}

/**
 * Delete a comment
 */
export async function deleteCommentAction(
  commentId: string,
  communitySlug: string
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

    // Note: RLS policies will handle authorization
    await PostRepository.deleteComment(commentId);

    // Revalidate community page
    revalidatePath(`/c/${communitySlug}`);

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting comment:', error);
    return {
      success: false,
      error: error.message || 'Erro ao deletar comentário',
    };
  }
}

/**
 * Pin/unpin a post (community owner only)
 */
export async function togglePinPostAction(
  postId: string,
  communitySlug: string,
  currentlyPinned: boolean
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

    // Get community
    const community = await CommunityRepository.getBySlug(communitySlug);
    if (!community || community.owner_id !== user.id) {
      return { success: false, error: 'Apenas o dono da comunidade pode fixar posts' };
    }

    // Toggle pin
    await PostRepository.update(postId, { is_pinned: !currentlyPinned });

    // Revalidate community page
    revalidatePath(`/c/${communitySlug}`);

    return { success: true };
  } catch (error: any) {
    console.error('Error toggling pin:', error);
    return {
      success: false,
      error: error.message || 'Erro ao fixar post',
    };
  }
}

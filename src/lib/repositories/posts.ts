import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';
import type { CreatePostInput, UpdatePostInput, CreateCommentInput } from '@/lib/schemas/post';

type Post = Database['public']['Tables']['posts']['Row'];
type Comment = Database['public']['Tables']['comments']['Row'];

type PostWithAuthor = Post & {
  author: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  user_has_liked?: boolean;
};

type CommentWithAuthor = Comment & {
  author: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
};

export class PostRepository {
  /**
   * Get posts by community ID
   */
  static async getByCommunity(
    communityId: string,
    userId?: string,
    params?: { page?: number; limit?: number }
  ): Promise<PostWithAuthor[]> {
    const supabase = await createClient();
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        author:profiles!author_id(id, full_name, avatar_url)
      `
      )
      .eq('community_id', communityId)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Check if user has liked each post
    if (userId && data) {
      const postIds = data.map((p) => p.id);
      const { data: likes } = await supabase
        .from('post_likes')
        .select('post_id')
        .in('post_id', postIds)
        .eq('user_id', userId);

      const likedPostIds = new Set(likes?.map((l) => l.post_id) || []);

      return data.map((post: unknown) => {
        const p = post as { id: string } & Record<string, unknown>;
        return {
          ...(p as object),
          user_has_liked: likedPostIds.has(p.id),
        } as unknown as PostWithAuthor;
      });
    }

    return data || [];
  }

  /**
   * Get post by ID
   */
  static async getById(id: string, userId?: string): Promise<PostWithAuthor | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        author:profiles!author_id(id, full_name, avatar_url)
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    // Check if user has liked the post
    if (userId) {
      const { data: like } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', id)
        .eq('user_id', userId)
        .single();

      return {
        ...(data as object),
        user_has_liked: !!like,
      } as unknown as PostWithAuthor;
    }

    return data;
  }

  /**
   * Create a new post
   */
  static async create(input: CreatePostInput, authorId: string): Promise<Post> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...input,
        author_id: authorId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  /**
   * Update a post
   */
  static async update(id: string, input: UpdatePostInput): Promise<Post> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('posts')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(input as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  /**
   * Delete a post
   */
  static async delete(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) throw error;
  }

  /**
   * Like a post
   */
  static async like(postId: string, userId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('post_likes').insert({
      post_id: postId,
      user_id: userId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    if (error) {
      // Ignore duplicate key error (already liked)
      if (error.code !== '23505') throw error;
    }
  }

  /**
   * Unlike a post
   */
  static async unlike(postId: string, userId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Get comments for a post
   */
  static async getComments(postId: string): Promise<CommentWithAuthor[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('comments')
      .select(
        `
        *,
        author:profiles!author_id(id, full_name, avatar_url)
      `
      )
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data || [];
  }

  /**
   * Create a comment
   */
  static async createComment(input: CreateCommentInput, authorId: string): Promise<Comment> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('comments')
      .insert({
        ...input,
        author_id: authorId,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  /**
   * Delete a comment
   */
  static async deleteComment(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('comments').delete().eq('id', id);

    if (error) throw error;
  }
}

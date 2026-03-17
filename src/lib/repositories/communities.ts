import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';
import type { CreateCommunityInput, UpdateCommunityInput } from '@/lib/schemas/community';

type Community = Database['public']['Tables']['communities']['Row'];
type CommunityWithOwner = Community & {
  owner: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  tags: Array<{ name: string }>;
};

export class CommunityRepository {
  /**
   * Get all communities with pagination
   */
  static async getAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<{ data: CommunityWithOwner[]; count: number }> {
    const supabase = await createClient();
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('communities')
      .select(
        `
        *,
        owner:profiles!owner_id(id, full_name, avatar_url),
        tags:community_tags(tag:tags(name))
      `,
        { count: 'exact' }
      )
      .order('member_count', { ascending: false })
      .range(offset, offset + limit - 1);

    if (params?.category && params.category !== 'Todos') {
      query = query.eq('category', params.category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    const communities = (data || []).map((c: unknown) => {
      const community = c as { tags?: Array<{ tag: { name: string } }> } & Record<string, unknown>;
      return {
        ...(community as object),
        tags: community.tags?.map((t) => t.tag) || [],
      };
    }) as unknown as CommunityWithOwner[];

    return { data: communities, count: count || 0 };
  }

  /**
   * Get community by slug
   */
  static async getBySlug(slug: string): Promise<CommunityWithOwner | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('communities')
      .select(
        `
        *,
        owner:profiles!owner_id(id, full_name, avatar_url),
        tags:community_tags(tag:tags(name))
      `
      )
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    const communityData = data as unknown as { tags?: Array<{ tag: { name: string } }> } & Record<
      string,
      unknown
    >;

    return {
      ...(communityData as object),
      tags: communityData.tags?.map((t) => t.tag) || [],
    } as unknown as CommunityWithOwner;
  }

  /**
   * Get community by ID
   */
  static async getById(id: string): Promise<Community | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  /**
   * Create a new community
   */
  static async create(input: CreateCommunityInput, ownerId: string): Promise<Community> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('communities')
      .insert({
        ...input,
        owner_id: ownerId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
      .select()
      .single();

    if (error) throw error;

    // Add owner as member with owner role
    await supabase.from('community_members').insert({
      community_id: data.id,
      user_id: ownerId,
      role: 'owner',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    return data;
  }

  /**
   * Update a community
   */
  static async update(id: string, input: UpdateCommunityInput): Promise<Community> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('communities')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(input as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  /**
   * Delete a community
   */
  static async delete(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('communities').delete().eq('id', id);

    if (error) throw error;
  }

  /**
   * Check if user is a member of a community
   */
  static async isMember(communityId: string, userId: string): Promise<boolean> {
    const supabase = await createClient();

    const { data } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', userId)
      .single();

    return !!data;
  }

  /**
   * Join a community
   */
  static async join(communityId: string, userId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('community_members').insert({
      community_id: communityId,
      user_id: userId,
      role: 'member',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    if (error) throw error;
  }

  /**
   * Leave a community
   */
  static async leave(communityId: string, userId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('community_id', communityId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  /**
   * Get community members
   */
  static async getMembers(communityId: string, limit = 20) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('community_members')
      .select(
        `
        *,
        user:profiles!user_id(id, full_name, username, avatar_url)
      `
      )
      .eq('community_id', communityId)
      .order('points', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  }
}

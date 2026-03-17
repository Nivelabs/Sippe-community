import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';
import type { UpdateProfileInput } from '@/lib/schemas/user';

type Profile = Database['public']['Tables']['profiles']['Row'];

export class UserRepository {
  /**
   * Get user profile by ID
   */
  static async getById(id: string): Promise<Profile | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profiles')
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
   * Get user profile by username
   */
  static async getByUsername(username: string): Promise<Profile | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  /**
   * Update user profile
   */
  static async update(id: string, input: UpdateProfileInput): Promise<Profile> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profiles')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(input as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  /**
   * Get user's communities
   */
  static async getCommunities(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('community_members')
      .select(
        `
        *,
        community:communities(*)
      `
      )
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });

    if (error) throw error;

    return data?.map((m: unknown) => (m as { community: Database['public']['Tables']['communities']['Row'] }).community) || [];
  }
}

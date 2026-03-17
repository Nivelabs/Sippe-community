'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Community = Database['public']['Tables']['communities']['Row'];

export function useCommunity(slug: string) {
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCommunity() {
      try {
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

        if (error) throw error;

        // Type cast data since Supabase TS mappings might be incomplete for deep joins
        const communityData = data as unknown as {
          tags?: Array<{ tag: { name: string } }>;
        } & Record<string, unknown>;

        setCommunity({
          ...(communityData as object),
          tags: communityData.tags?.map((t) => t.tag) || [],
        } as unknown as Community);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommunity();
  }, [slug, supabase]);

  return { community, loading, error };
}

export function useIsMember(communityId: string, userId?: string) {
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!userId || !communityId) {
      setLoading(false);
      return;
    }

    async function checkMembership() {
      try {
        if (!userId) {
          setIsMember(false);
          return;
        }

        const { data } = await supabase
          .from('community_members')
          .select('id')
          .eq('community_id', communityId)
          .eq('user_id', userId)
          .single();

        setIsMember(!!data);
      } catch (err) {
        console.error('Membership check failed', err);
        setIsMember(false);
      } finally {
        setLoading(false);
      }
    }

    checkMembership();
  }, [communityId, userId, supabase]);

  const joinCommunity = async () => {
    if (!userId) return;

    const { error } = await supabase.from('community_members').insert({
      community_id: communityId,
      user_id: userId,
      role: 'member',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    if (!error) {
      setIsMember(true);
    }
  };

  const leaveCommunity = async () => {
    if (!userId) return;

    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('community_id', communityId)
      .eq('user_id', userId);

    if (!error) {
      setIsMember(false);
    }
  };

  return { isMember, loading, joinCommunity, leaveCommunity };
}

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Post = Database['public']['Tables']['posts']['Row'] & {
  author: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  user_has_liked?: boolean;
};

export function usePosts(communityId: string, userId?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPosts() {
      try {
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
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (userId && data) {
          const typedData = data as unknown as Array<{ id: string }>;
          const postIds = typedData.map((p) => p.id);
          const { data: likes } = await supabase
            .from('post_likes')
            .select('post_id')
            .in('post_id', postIds)
            .eq('user_id', userId);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const likedPostIds = new Set(likes?.map((l: any) => l.post_id) || []);

          setPosts(
            data.map((post: unknown) => {
              const p = post as { id: string } & Record<string, unknown>;
              return {
                ...(p as object),
                user_has_liked: likedPostIds.has(p.id),
              } as unknown as Post;
            })
          );
        } else {
          setPosts(data as Post[]);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`posts:${communityId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `community_id=eq.${communityId}`,
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [communityId, userId, supabase]);

  return { posts, loading, error };
}

export function usePostLike(postId: string, userId?: string) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    async function checkLike() {
      if (!userId) return;

      const { data } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      setLiked(!!data);
    }

    async function fetchCount() {
      const { data } = await supabase.from('posts').select('likes_count').eq('id', postId).single();

      setLikesCount(data?.likes_count || 0);
    }

    checkLike();
    fetchCount();
  }, [postId, userId, supabase]);

  const toggleLike = async () => {
    if (!userId) return;

    if (liked) {
      // Unlike
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', userId);
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      // Like
      await supabase.from('post_likes').insert({
        post_id: postId,
        user_id: userId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  return { liked, likesCount, toggleLike };
}

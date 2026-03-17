import { z } from 'zod';

export const createPostSchema = z.object({
  community_id: z.string().uuid('ID da comunidade inválido'),
  content: z.string().min(1, 'Conteúdo é obrigatório').max(5000, 'Conteúdo muito longo'),
  image_url: z.string().url('URL da imagem inválida').optional().nullable(),
});

export const updatePostSchema = z.object({
  content: z.string().min(1).max(5000).optional(),
  image_url: z.string().url().optional().nullable(),
  is_pinned: z.boolean().optional(),
});

export const createCommentSchema = z.object({
  post_id: z.string().uuid('ID do post inválido'),
  content: z.string().min(1, 'Comentário é obrigatório').max(2000, 'Comentário muito longo'),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;

import { z } from 'zod';

export const createCommunitySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres').max(500),
  category: z.string().min(1, 'Categoria é obrigatória'),
  price: z.number().min(0).default(0),
  is_private: z.boolean().default(false),
  cover_url: z.string().url().optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
});

export const updateCommunitySchema = createCommunitySchema.partial();

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;
export type UpdateCommunityInput = z.infer<typeof updateCommunitySchema>;

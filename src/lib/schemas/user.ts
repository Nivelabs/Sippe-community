import { z } from 'zod';

export const updateProfileSchema = z.object({
  full_name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional(),
  username: z
    .string()
    .min(3, 'Username deve ter no mínimo 3 caracteres')
    .max(30)
    .regex(/^[a-z0-9_]+$/, 'Username deve conter apenas letras minúsculas, números e _')
    .optional(),
  bio: z.string().max(500).optional().nullable(),
  website: z.string().url('URL inválida').optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  avatar_url: z.string().url('URL do avatar inválida').optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

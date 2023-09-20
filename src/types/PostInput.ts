import z from 'zod'

const IMAGE_TYPES = ['image/jpeg', 'image/png']

export const schema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file, 'image is required')
    .refine(
      (file) => file instanceof File && file.size < 500000,
      'file size is max 5MB',
    )
    .refine(
      (file) => file instanceof File && IMAGE_TYPES.includes(file.type),
      'Only JPEG or PNG allowed',
    ),
  caption: z
    .string()
    .min(1, 'caption is required')
    .max(150, 'caption is max 150 characters'),
})

export type PostInput = z.infer<typeof schema>

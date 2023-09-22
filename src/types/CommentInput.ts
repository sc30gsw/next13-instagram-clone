import z from 'zod'

export const schema = z.object({
  comment: z.string().min(1, 'comment is required'),
})

export type CommentInput = z.infer<typeof schema>

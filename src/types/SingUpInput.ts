import z from 'zod'

export const schema = z.object({
  name: z
    .string()
    .min(8, 'please enter at least 8 characters')
    .max(24, 'please enter within 24 characters'),
  email: z.string().min(1, 'required').email('format is incorrect'),
  password: z
    .string()
    .min(8, 'please enter at least 8 characters')
    .refine(
      (password: string) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      'password must contain both letters and numbers',
    ),
})

export type SignUpForm = z.infer<typeof schema>

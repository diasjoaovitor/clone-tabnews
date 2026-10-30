import { z } from 'zod'

import { createUserSchema } from '@/models/user-model/schema'

const passwordsMatch = z.refine<{
  password: string
  password_confirmation: string
}>((data) => data.password === data.password_confirmation, {
  message: 'As senhas não coincidem.',
  path: ['password_confirmation'],
  // By default an object refinement waits for every field to be valid; this one only needs the
  // confirmation filled, so a mismatch shows even while the password is still too short
  when: ({ issues }) =>
    issues.every((issue) => issue.path?.[0] !== 'password_confirmation')
})

export const registrationSchema = createUserSchema
  .extend({
    password_confirmation: z
      .string({ message: 'Confirme sua senha.' })
      .min(1, { message: 'Confirme sua senha.' })
  })
  .check(passwordsMatch)

export type RegistrationInput = z.input<typeof registrationSchema>

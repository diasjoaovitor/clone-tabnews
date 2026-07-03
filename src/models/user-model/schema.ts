import { z } from 'zod'

export const createUserSchema = z.object({
  username: z
    .string({ message: 'O username é obrigatório.' })
    .min(1, { message: 'O username é obrigatório.' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'O username deve conter apenas letras e números.'
    }),
  email: z.email({ message: 'O email informado não é válido.' }),
  password: z
    .string({ message: 'A senha é obrigatória.' })
    .min(8, { message: 'A senha deve conter pelo menos 8 caracteres.' })
})

export type TCreateUser = z.infer<typeof createUserSchema>

export const updateUserSchema = createUserSchema.partial()

export type TUpdateUser = z.infer<typeof updateUserSchema>

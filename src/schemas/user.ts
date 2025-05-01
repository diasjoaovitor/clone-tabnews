import { z } from 'zod'

const usernameSchema = z
  .string({ message: 'O username é obrigatório.' })
  .min(1, { message: 'O username deve conter pelo menos 1 caractere.' })
const emailSchema = z
  .string({ message: 'O email é obrigatório.' })
  .email({ message: 'O email informado não é válido.' })
const passwordSchema = z
  .string({ message: 'A senha é obrigatória.' })
  .min(8, { message: 'A senha deve conter pelo menos 8 caracteres.' })

export const createUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema
})

export type TCreateUserSchema = z.infer<typeof createUserSchema>

export const updateUserSchema = z.object({
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional()
})

export type TUpdateUserSchema = z.infer<typeof updateUserSchema>

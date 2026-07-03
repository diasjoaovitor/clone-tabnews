import { z } from 'zod'

export const credentialsSchema = z.object({
  email: z.email({ message: 'O email informado não é válido.' }),
  password: z.string({ message: 'A senha é obrigatória.' })
})

export type TCredentials = z.infer<typeof credentialsSchema>

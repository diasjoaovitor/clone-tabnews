import { z } from 'zod'

export const activationTokenIdSchema = z.object({
  token_id: z.uuid({ message: 'O token de ativação informado não é válido.' })
})

export type ActivationTokenIdInput = z.input<typeof activationTokenIdSchema>

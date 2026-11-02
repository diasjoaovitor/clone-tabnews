import { z } from 'zod'

// `sessionModel.create` generates the token from 48 random bytes, as hex
export const sessionTokenSchema = z.string().regex(/^[0-9a-f]{96}$/)

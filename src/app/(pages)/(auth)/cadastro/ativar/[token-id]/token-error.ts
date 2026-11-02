import { z } from 'zod'

import { ValidationError } from '@/infra/errors'

// The token has no visible field to show a field error on, so its validation error becomes the
// form's message
export const tokenErrorAsMessage = (error: unknown) =>
  error instanceof z.ZodError ? ValidationError.fromZodError(error) : error

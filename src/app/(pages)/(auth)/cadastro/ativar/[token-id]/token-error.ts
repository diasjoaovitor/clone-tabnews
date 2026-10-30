import { z } from 'zod'

import { ValidationError } from '@/infra/errors'

// The token travels in a hidden field, which has nowhere to show a field error, so its validation
// error becomes the form's message
export const tokenErrorAsMessage = (error: unknown) =>
  error instanceof z.ZodError ? ValidationError.fromZodError(error) : error

import { z } from 'zod'

import { ValidationError } from './errors'

export const validateSchema = (schema: z.ZodSchema, params: any) => {
  try {
    schema.parse(params)
  } catch (error) {
    throw new ValidationError({
      message: (error as z.ZodError).errors[0].message
    })
  }
}

import { NextRequest } from 'next/server'

import { ValidationError } from '@/infra/errors'

export const readJsonBody = async (
  request: NextRequest
): ReturnType<NextRequest['json']> => {
  try {
    return await request.json()
  } catch (error) {
    throw new ValidationError({
      message: 'O corpo da requisição não é um JSON válido.',
      cause: error
    })
  }
}

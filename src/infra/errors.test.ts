import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import {
  InternalServerError,
  normalizeError,
  ServiceError,
  ValidationError
} from '@/infra/errors'

describe('normalizeError', () => {
  test('turns a Zod error into a validation error with its fields', () => {
    const result = z.object({ email: z.email('E-mail inválido.') }).safeParse({
      email: 'ana@'
    })
    const error = normalizeError(result.error)
    expect(error).toBeInstanceOf(ValidationError)
    expect(error).toMatchObject({
      statusCode: 400,
      message: 'E-mail inválido.',
      fields: { email: 'E-mail inválido.' }
    })
  })

  test('keeps the path of a nested field and its first message', () => {
    const link = z.object({
      url: z.string().min(1, 'Informe.').min(2, 'Curto.')
    })
    const result = z
      .object({ links: z.array(link) })
      .safeParse({ links: [{ url: 'ok' }, { url: '' }] })
    expect(normalizeError(result.error)).toMatchObject({
      fields: { 'links.1.url': 'Informe.' }
    })
  })

  test('keeps an app error as it is', () => {
    const serviceError = new ServiceError({})
    expect(normalizeError(serviceError)).toBe(serviceError)
  })

  test('wraps any other error in an internal server error', () => {
    const cause = new Error('column "foo" does not exist')
    const error = normalizeError(cause)
    expect(error).toBeInstanceOf(InternalServerError)
    expect(error).toMatchObject({ statusCode: 500, cause })
  })

  test('wraps a thrown value that is not an error', () => {
    expect(normalizeError('falhou')).toMatchObject({
      statusCode: 500,
      cause: 'falhou'
    })
  })
})

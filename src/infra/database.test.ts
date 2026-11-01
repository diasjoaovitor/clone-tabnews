import { DatabaseError } from 'pg'
import { describe, expect, test } from 'vitest'

import { database } from '@/infra/database'
import { ServiceError } from '@/infra/errors'

const databaseError = (code: string) => {
  const error = new DatabaseError('falhou', 0, 'error')
  error.code = code
  return error
}

const errnoError = (code: string) =>
  Object.assign(new Error(`connect ${code}`), { code })

describe('database.mapConnectionError', () => {
  test.each([
    ['a connection exception', databaseError('08006')],
    ['too many connections', databaseError('53300')],
    ['the server shutting down', databaseError('57P01')],
    ['a refused connection', errnoError('ECONNREFUSED')],
    ['a reset connection', errnoError('ECONNRESET')],
    ['an unknown host', errnoError('ENOTFOUND')],
    ['a lost connection', new Error('Connection terminated unexpectedly')],
    ['a connection timeout', new Error('timeout expired')]
  ])('turns %s into a service error', (_, cause) => {
    const error = database.mapConnectionError(cause)
    expect(error).toBeInstanceOf(ServiceError)
    expect(error).toMatchObject({ statusCode: 503, cause })
  })

  test.each([
    ['a syntax error', databaseError('42601')],
    ['an undefined column', databaseError('42703')],
    ['a unique violation', databaseError('23505')],
    ['a plain error', new TypeError('Cannot read properties of undefined')],
    ['a value that is not an error', 'falhou']
  ])('keeps %s as it is', (_, cause) => {
    expect(database.mapConnectionError(cause)).toBe(cause)
  })
})

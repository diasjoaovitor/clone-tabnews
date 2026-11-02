import { DatabaseError } from 'pg'

import { ValidationError } from '@/infra/errors'

const UNIQUE_VIOLATION_CODE = '23505'

export const createDuplicatedUsernameError = (): ValidationError =>
  new ValidationError({
    message: 'O username informado já está sendo utilizado.',
    action: 'Utilize outro username para realizar esta operação.',
    statusCode: 409
  })

export const createDuplicatedEmailError = (): ValidationError =>
  new ValidationError({
    message: 'O email informado já está sendo utilizado.',
    action: 'Utilize outro email para realizar esta operação.',
    statusCode: 409
  })

// Two simultaneous requests can both pass the lookups in `validateUniqueUsername`/`validateUniqueEmail`,
// so the unique indexes are the last check
export const mapUniqueViolationError = (error: unknown): unknown => {
  if (
    !(error instanceof DatabaseError) ||
    error.code !== UNIQUE_VIOLATION_CODE
  ) {
    return error
  }
  if (error.constraint === 'users_username_lower_key') {
    return createDuplicatedUsernameError()
  }
  if (error.constraint === 'users_email_lower_key') {
    return createDuplicatedEmailError()
  }
  return error
}

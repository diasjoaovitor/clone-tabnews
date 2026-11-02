import { redirect } from 'next/navigation'
import { describe, expect, test, vi } from 'vitest'
import { z } from 'zod'

import { ServiceError, ValidationError } from '@/infra/errors'

import { formAction, formSuccess } from './form-action'

vi.mock('./session', () => ({
  session: {
    resolveAndClearInvalid: vi.fn(async () => ({ user: { features: [] } }))
  }
}))

const schema = z.object({
  email: z.email('Informe um e-mail válido.'),
  password: z.string().min(8, 'Senha curta.').max(1, 'Nunca chega aqui.')
})

const submitted = { email: 'ana@', password: 'curta' }

describe('formAction', () => {
  test('turns a Zod error into the first message of each field', async () => {
    const state = await formAction(submitted, async (input) => {
      schema.parse(input)
      return formSuccess('Pronto.')
    })
    expect(state).toMatchObject({
      status: 'error',
      errors: { email: 'Informe um e-mail válido.', password: 'Senha curta.' }
    })
  })

  test("turns an app error into the form's message and action", async () => {
    const state = await formAction(submitted, async () => {
      throw new ValidationError({
        message: 'O e-mail informado já está sendo utilizado.',
        action: 'Utilize outro e-mail para realizar esta operação.'
      })
    })
    expect(state).toMatchObject({
      status: 'error',
      message: 'O e-mail informado já está sendo utilizado.',
      action: 'Utilize outro e-mail para realizar esta operação.',
      errors: {}
    })
  })

  test('logs a 5xx app error and still shows its message', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const state = await formAction(submitted, async () => {
      throw new ServiceError({ message: 'Erro na conexão com o banco.' })
    })
    expect(state).toMatchObject({
      status: 'error',
      message: 'Erro na conexão com o banco.'
    })
    expect(log).toHaveBeenCalled()
    log.mockRestore()
  })

  test('hides an unexpected error behind a generic message', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const state = await formAction(submitted, async () => {
      throw new Error('connection refused')
    })
    expect(state).toMatchObject({
      status: 'error',
      message: 'Um erro interno não esperado aconteceu'
    })
    expect(log).toHaveBeenCalled()
    log.mockRestore()
  })

  test('lets redirect() through', async () => {
    await expect(
      formAction(submitted, async () => redirect('/'))
    ).rejects.toThrow('NEXT_REDIRECT')
  })
})

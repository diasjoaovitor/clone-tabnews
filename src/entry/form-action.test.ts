import { redirect } from 'next/navigation'
import { describe, expect, test, vi } from 'vitest'
import { z } from 'zod'

import { formAction, formSuccess } from '@/entry/form-action'
import { ServiceError, ValidationError } from '@/infra/errors'

vi.mock('@/entry/session', () => ({
  session: {
    resolveAndClearInvalid: vi.fn(async () => ({ user: { features: [] } }))
  }
}))

const formData = (entries: Record<string, string | string[] | File>) => {
  const data = new FormData()
  for (const [key, value] of Object.entries(entries)) {
    for (const item of [value].flat()) data.append(key, item)
  }
  return data
}

const schema = z.object({
  email: z.email('Informe um e-mail válido.'),
  password: z.string().min(8, 'Senha curta.').max(1, 'Nunca chega aqui.')
})

const submitted = formData({
  email: 'ana@',
  password: 'curta',
  $ACTION_ID_abc: ''
})

describe('formAction', () => {
  test("passes only the schema's fields to the handler", async () => {
    const handler = vi.fn(async () => formSuccess('Pronto.'))
    await formAction(
      formData({ email: 'ana@', password: 'curta', role: 'admin' }),
      schema,
      handler
    )
    expect(handler).toHaveBeenCalledWith({ email: 'ana@', password: 'curta' })
  })

  test('leaves out the entries React adds to a post without JavaScript', async () => {
    const handler = vi.fn(async () => formSuccess('Pronto.'))
    await formAction(submitted, schema, handler)
    expect(handler).toHaveBeenCalledWith({ email: 'ana@', password: 'curta' })
  })

  test('keeps every value of a repeated field and leaves out a missing one', async () => {
    const mixedSchema = z.object({
      tags: z.array(z.string()),
      notify: z.boolean(),
      attachment: z.file()
    })
    const attachment = new File(['oi'], 'nota.txt')
    const handler = vi.fn(async () => formSuccess('Pronto.'))
    await formAction(
      formData({ tags: ['next', 'react'], attachment }),
      mixedSchema,
      handler
    )
    expect(handler).toHaveBeenCalledWith({
      tags: ['next', 'react'],
      attachment
    })
  })

  test('leaves out an empty file input, as the client does', async () => {
    const handler = vi.fn(async () => formSuccess('Pronto.'))
    await formAction(
      formData({ title: 'Olá', attachment: new File([], '') }),
      z.object({ title: z.string(), attachment: z.file().optional() }),
      handler
    )
    expect(handler).toHaveBeenCalledWith({ title: 'Olá' })
  })

  test('turns a Zod error into the first message of each field', async () => {
    const state = await formAction(submitted, schema, async (input) => {
      schema.parse(input)
      return formSuccess('Pronto.')
    })
    expect(state).toMatchObject({
      status: 'error',
      errors: { email: 'Informe um e-mail válido.', password: 'Senha curta.' }
    })
  })

  test('echoes the submitted text and lists, without files', async () => {
    const echoSchema = z.object({
      title: z.string(),
      tags: z.array(z.string()),
      attachment: z.file()
    })
    const state = await formAction(
      formData({
        title: 'Olá',
        tags: ['next', 'react'],
        attachment: new File(['oi'], 'nota.txt')
      }),
      echoSchema,
      async () => {
        throw new ValidationError()
      }
    )
    expect(state.status === 'error' && state.values).toEqual({
      title: 'Olá',
      tags: ['next', 'react']
    })
  })

  test('echoes the submitted values except passwords', async () => {
    const state = await formAction(submitted, schema, async () => {
      throw new ValidationError()
    })
    expect(state).toMatchObject({ values: { email: 'ana@' } })
    expect(state.status === 'error' && state.values).not.toHaveProperty(
      'password'
    )
  })

  test("turns an app error into the form's message and action", async () => {
    const state = await formAction(submitted, schema, async () => {
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
    const state = await formAction(submitted, schema, async () => {
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
    const state = await formAction(submitted, schema, async () => {
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
      formAction(submitted, schema, async () => redirect('/'))
    ).rejects.toThrow('NEXT_REDIRECT')
  })
})

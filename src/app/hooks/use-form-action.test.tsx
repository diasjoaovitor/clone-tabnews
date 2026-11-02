import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Controller } from 'react-hook-form'
import { describe, expect, test, vi } from 'vitest'
import { z } from 'zod'

import { FieldFrame, FormField } from '@/app/components/ui/custom/form-field'
import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { formError, type FormState, formSuccess } from '@/entry/form-action'

import { useFormAction } from './use-form-action'

const schema = z.object({
  name: z.string().min(1, { message: 'Informe o nome.' }),
  email: z.string().min(1, { message: 'Informe o email.' })
})

type Values = z.input<typeof schema>
type Action = (
  state: FormState<Values>,
  input: Values
) => Promise<FormState<Values>>

const TestForm = ({ action }: { action: Action }) => {
  const { field, state, pending, announcement, formProps } = useFormAction({
    schema,
    defaultValues: { name: '', email: '' },
    action
  })

  return (
    <form {...formProps}>
      <FormField label="Nome" {...field('name')} />
      <FormField label="Email" {...field('email')} />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Enviar</SubmitButton>
    </form>
  )
}

const answerWithFieldErrors =
  (errors: Partial<Values>): Action =>
  async () =>
    formError<Values>({ errors })

const setup = (action: Action) => {
  const user = userEvent.setup()
  render(<TestForm action={action} />)
  return {
    user,
    name: screen.getByRole('textbox', { name: 'Nome' }),
    email: screen.getByRole('textbox', { name: 'Email' }),
    submit: screen.getByRole('button', { name: 'Enviar' })
  }
}

describe('useFormAction', () => {
  test('submits the typed values', async () => {
    const action = vi.fn<Action>(async () => formSuccess('Pronto.'))
    const { user, name, email, submit } = setup(action)

    await user.type(name, 'Ana')
    await user.type(email, 'ana@curso.dev')
    await user.click(submit)

    await waitFor(() => expect(action).toHaveBeenCalled())
    expect(action.mock.calls[0]![1]).toEqual({
      name: 'Ana',
      email: 'ana@curso.dev'
    })
  })

  test('does not submit while a field is invalid', async () => {
    const action = vi.fn<Action>(async () => formSuccess('Pronto.'))
    const { user, name, submit } = setup(action)

    await user.click(submit)

    await waitFor(() => expect(document.activeElement).toBe(name))
    expect(action).not.toHaveBeenCalled()
  })

  test('focuses and announces the latest rejection, from the client or else from the server', async () => {
    const { user, name, email, submit } = setup(
      answerWithFieldErrors({ name: 'Nome em uso.' })
    )
    const liveRegion = document.querySelector('[aria-live="polite"]')!

    await user.type(name, 'Ana')
    await user.type(email, 'ana@curso.dev')
    await user.click(submit)
    await waitFor(() => expect(document.activeElement).toBe(name))

    await user.clear(email)
    await user.click(submit)
    await waitFor(() => expect(document.activeElement).toBe(email))
    expect(liveRegion.textContent).toBe('Informe o email.')

    await user.type(email, 'ana@curso.dev')
    await user.click(submit)
    await waitFor(() => expect(document.activeElement).toBe(name))
    expect(liveRegion.textContent).toBe('Nome em uso.')
  })

  test('replaces a form message with a later client-side rejection', async () => {
    const { user, name, email, submit } = setup(async () =>
      formError<Values>({ message: 'Dados incorretos.' })
    )
    const liveRegion = document.querySelector('[aria-live="polite"]')!

    await user.type(name, 'Ana')
    await user.type(email, 'ana@curso.dev')
    await user.click(submit)
    await waitFor(() =>
      expect(liveRegion.textContent).toBe('Dados incorretos.')
    )

    await user.clear(email)
    await user.click(submit)

    await waitFor(() => expect(liveRegion.textContent).toBe('Informe o email.'))
    expect(document.activeElement).toBe(email)
  })

  test('does not announce an old server error again while a valid submit is pending', async () => {
    const answer = Promise.withResolvers<FormState<Values>>()
    const action = vi
      .fn<Action>()
      .mockResolvedValueOnce(formError<Values>({ errors: { name: 'Em uso.' } }))
      .mockReturnValueOnce(answer.promise)
    const { user, name, email, submit } = setup(action)
    const liveRegion = document.querySelector('[aria-live="polite"]')!

    await user.type(name, 'Ana')
    await user.type(email, 'ana@curso.dev')
    await user.click(submit)
    await waitFor(() => expect(liveRegion.textContent).toBe('Em uso.'))

    await user.type(name, 'na')
    await user.clear(email)
    await user.click(submit)
    await waitFor(() => expect(liveRegion.textContent).toBe('Informe o email.'))

    await user.type(email, 'ana@curso.dev')
    await user.click(submit)
    await waitFor(() => expect(action).toHaveBeenCalledTimes(2))

    expect(liveRegion.textContent).toBe('')
    answer.resolve(formSuccess('Pronto.'))
    await waitFor(() => expect(liveRegion.textContent).toBe('Pronto.'))
  })

  test('moves the focus to the first invalid field after a client-side rejection', async () => {
    const { user, name, email, submit } = setup(answerWithFieldErrors({}))

    await user.type(email, 'ana@curso.dev')
    await user.click(submit)

    await waitFor(() => expect(document.activeElement).toBe(name))
    expect(name.getAttribute('aria-invalid')).toBe('true')
  })

  test('moves the focus to the first field the server rejected', async () => {
    const { user, name, email, submit } = setup(
      answerWithFieldErrors({ email: 'Email em uso.' })
    )

    await user.type(name, 'Ana')
    await user.type(email, 'ana@curso.dev')
    await user.click(submit)

    await waitFor(() => expect(document.activeElement).toBe(email))
    expect(email.getAttribute('aria-invalid')).toBe('true')
  })

  test('hides a server error once its field is edited and keeps the others', async () => {
    const { user, name, email, submit } = setup(
      answerWithFieldErrors({ name: 'Nome em uso.', email: 'Email em uso.' })
    )

    await user.type(name, 'Ana')
    await user.type(email, 'ana@curso.dev')
    await user.click(submit)
    await screen.findByRole('textbox', {
      name: 'Nome',
      description: 'Nome em uso.'
    })

    await user.type(name, 'Maria')

    await screen.findByRole('textbox', { name: 'Nome', description: '' })
    expect(
      screen.getByRole('textbox', {
        name: 'Email',
        description: 'Email em uso.'
      })
    ).toBe(email)
  })

  test('shows the server error again when an edited field is rejected on the next submit', async () => {
    const { user, name, email, submit } = setup(
      answerWithFieldErrors({ email: 'Email em uso.' })
    )

    await user.type(name, 'Ana')
    await user.type(email, 'ana@curso.dev')
    await user.click(submit)
    await screen.findByRole('textbox', {
      name: 'Email',
      description: 'Email em uso.'
    })

    await user.type(email, 'x')
    await screen.findByRole('textbox', { name: 'Email', description: '' })
    await user.click(submit)

    await screen.findByRole('textbox', {
      name: 'Email',
      description: 'Email em uso.'
    })
  })

  test('does not reveal an error when the focus leaves for the submit button', async () => {
    const { user, email, submit } = setup(answerWithFieldErrors({}))

    await user.type(email, 'a')
    await user.clear(email)
    await user.tab()

    expect(document.activeElement).toBe(submit)
    expect(
      screen.getByRole('textbox', { name: 'Email', description: '' })
    ).toBe(email)
  })

  test('reveals an error once the focus leaves for another field and hides it when corrected', async () => {
    const { user, name, email } = setup(answerWithFieldErrors({}))

    await user.type(name, 'a')
    await user.clear(name)
    expect(screen.getByRole('textbox', { name: 'Nome', description: '' })).toBe(
      name
    )
    await user.tab()

    expect(document.activeElement).toBe(email)
    await screen.findByRole('textbox', {
      name: 'Nome',
      description: 'Informe o nome.'
    })

    await user.type(name, 'Ana')
    await screen.findByRole('textbox', { name: 'Nome', description: '' })
  })

  test('announces the first field error on every rejected submit', async () => {
    const { user, submit } = setup(answerWithFieldErrors({}))
    const liveRegion = document.querySelector('[aria-live="polite"]')!

    await user.click(submit)
    await waitFor(() => expect(liveRegion.textContent).toBe('Informe o nome.'))
    const firstAnnouncement = liveRegion.firstElementChild

    await user.click(submit)

    await waitFor(() =>
      expect(liveRegion.firstElementChild).not.toBe(firstAnnouncement)
    )
    expect(liveRegion.textContent).toBe('Informe o nome.')
  })
})

const passwordSchema = z
  .object({ password: z.string(), confirmation: z.string() })
  .refine((data) => data.password === data.confirmation, {
    message: 'As senhas não coincidem.',
    path: ['confirmation']
  })

type PasswordValues = z.input<typeof passwordSchema>

const PasswordForm = () => {
  const { field, formProps } = useFormAction({
    schema: passwordSchema,
    defaultValues: { password: '', confirmation: '' },
    action: async (): Promise<FormState<PasswordValues>> => ({ status: 'idle' })
  })

  return (
    <form {...formProps}>
      <FormField
        label="Senha"
        {...field('password', { revalidates: 'confirmation' })}
      />
      <FormField label="Confirmação" {...field('confirmation')} />
    </form>
  )
}

describe('useFormAction with a field that depends on another', () => {
  test('compares both sides live, without revealing an error on a field not visited yet', async () => {
    const user = userEvent.setup()
    render(<PasswordForm />)
    const password = screen.getByRole('textbox', { name: 'Senha' })
    const confirmation = screen.getByRole('textbox', { name: 'Confirmação' })

    await user.type(password, 'senha123')
    await user.tab()
    expect(confirmation.getAttribute('aria-invalid')).toBeNull()

    await user.type(confirmation, 'outra')
    await user.tab()
    await screen.findByRole('textbox', {
      name: 'Confirmação',
      description: 'As senhas não coincidem.'
    })

    await user.clear(confirmation)
    await user.type(confirmation, 'senha123')
    await screen.findByRole('textbox', { name: 'Confirmação', description: '' })

    await user.type(password, '4')
    await screen.findByRole('textbox', {
      name: 'Confirmação',
      description: 'As senhas não coincidem.'
    })
  })
})

const linkSchema = z.object({
  url: z.string().min(1, { message: 'Informe o link.' })
})

const listSchema = z.object({ links: z.array(linkSchema) })

type ListValues = z.input<typeof listSchema>
type ListAction = (
  state: FormState<ListValues>,
  input: ListValues
) => Promise<FormState<ListValues>>

const ListForm = ({
  action = async () => formSuccess('Pronto.')
}: {
  action?: ListAction
}) => {
  const { field, state, pending, announcement, formProps } = useFormAction({
    schema: listSchema,
    defaultValues: { links: [{ url: '' }, { url: '' }] },
    action
  })

  return (
    <form {...formProps}>
      <FormField label="Primeiro link" {...field('links.0.url')} />
      <FormField label="Segundo link" {...field('links.1.url')} />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Salvar</SubmitButton>
    </form>
  )
}

describe('useFormAction with a list of fields', () => {
  test('focuses and announces an invalid item after a valid one', async () => {
    const user = userEvent.setup()
    render(<ListForm />)
    const liveRegion = document.querySelector('[aria-live="polite"]')!
    const second = screen.getByRole('textbox', { name: 'Segundo link' })

    await user.type(
      screen.getByRole('textbox', { name: 'Primeiro link' }),
      'https://curso.dev'
    )
    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    await waitFor(() => expect(document.activeElement).toBe(second))
    expect(liveRegion.textContent).toBe('Informe o link.')
  })

  test('focuses and announces the item the server rejected', async () => {
    const user = userEvent.setup()
    render(
      <ListForm
        action={async () =>
          formError<ListValues>({
            errors: { 'links.1.url': 'Link fora do ar.' }
          })
        }
      />
    )
    const liveRegion = document.querySelector('[aria-live="polite"]')!
    const second = screen.getByRole('textbox', { name: 'Segundo link' })

    await user.type(
      screen.getByRole('textbox', { name: 'Primeiro link' }),
      'https://curso.dev'
    )
    await user.type(second, 'https://curso.dev/fora')
    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    await waitFor(() => expect(document.activeElement).toBe(second))
    expect(second.getAttribute('aria-invalid')).toBe('true')
    expect(liveRegion.textContent).toBe('Link fora do ar.')
  })
})

const controlSchema = z.object({
  body: z.string().min(1, { message: 'Escreva o conteúdo.' }),
  notify: z.boolean(),
  tags: z.array(z.string()),
  attachment: z.file().optional()
})

type ControlValues = z.input<typeof controlSchema>
type ControlAction = (
  state: FormState<ControlValues>,
  input: ControlValues
) => Promise<FormState<ControlValues>>

const ControlForm = ({ action }: { action: ControlAction }) => {
  const { form, field, state, pending, announcement, formProps } =
    useFormAction({
      schema: controlSchema,
      defaultValues: { body: '', notify: true, tags: [] },
      action
    })
  const { error: bodyError, ...body } = field('body')
  const { error: notifyError, ...notify } = field('notify')
  const { error: tagsError, ...tags } = field('tags')

  return (
    <form {...formProps}>
      <FieldFrame label="Conteúdo" error={bodyError}>
        {(control) => <textarea {...control} {...body} />}
      </FieldFrame>
      <FieldFrame label="Avisar quem me segue" error={notifyError}>
        {(control) => <input {...control} {...notify} type="checkbox" />}
      </FieldFrame>
      <FieldFrame label="Tags" error={tagsError}>
        {(control) => (
          <select {...control} {...tags} multiple>
            <option>next</option>
            <option>react</option>
            <option>zod</option>
          </select>
        )}
      </FieldFrame>
      <Controller
        control={form.control}
        name="attachment"
        render={({ field: { name, ref, onBlur, onChange }, fieldState }) => (
          <FieldFrame label="Anexo" error={fieldState.error?.message}>
            {(control) => (
              <input
                {...control}
                name={name}
                ref={ref}
                onBlur={onBlur}
                type="file"
                onChange={(event) => onChange(event.target.files?.[0])}
              />
            )}
          </FieldFrame>
        )}
      />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Publicar</SubmitButton>
    </form>
  )
}

const InitialForm = () => {
  const { state, formProps } = useFormAction({
    schema,
    defaultValues: { name: '', email: '' },
    action: answerWithFieldErrors({}),
    initialState: formError<Values>({ message: 'O link expirou.' })
  })
  return (
    <form {...formProps}>
      <FormMessage state={state} />
    </form>
  )
}

const setupControls = () => {
  const user = userEvent.setup()
  const action = vi.fn<ControlAction>(async () => formSuccess('Publicado.'))
  render(<ControlForm action={action} />)
  return {
    user,
    action,
    body: screen.getByRole('textbox', { name: 'Conteúdo' }),
    notify: screen.getByRole('checkbox', { name: 'Avisar quem me segue' }),
    tags: screen.getByRole('listbox', { name: 'Tags' }),
    attachment: screen.getByLabelText('Anexo'),
    submit: screen.getByRole('button', { name: 'Publicar' })
  }
}

describe('useFormAction with controls other than text inputs', () => {
  test('submits each value with its own type', async () => {
    const { user, action, body, notify, tags, attachment, submit } =
      setupControls()
    const file = new File(['oi'], 'nota.txt')

    await user.type(body, 'Olá')
    await user.click(notify)
    await user.selectOptions(tags, ['next', 'zod'])
    await user.upload(attachment, file)
    await user.click(submit)

    await waitFor(() => expect(action).toHaveBeenCalled())
    expect(action.mock.calls[0]![1]).toEqual({
      body: 'Olá',
      notify: false,
      tags: ['next', 'zod'],
      attachment: file
    })
  })

  test('moves the focus to an invalid textarea', async () => {
    const { user, action, body, submit } = setupControls()

    await user.click(submit)

    await waitFor(() => expect(document.activeElement).toBe(body))
    expect(action).not.toHaveBeenCalled()
  })

  test('shows a message rendered with the page', () => {
    render(<InitialForm />)

    expect(document.activeElement).toBe(
      screen.getByText('O link expirou.').parentElement
    )
  })
})

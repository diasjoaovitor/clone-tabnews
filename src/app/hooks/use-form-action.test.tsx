import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { useFormAction } from '@/app/hooks/use-form-action'
import { formError, type FormState } from '@/entry/form-action'

const schema = z.object({
  name: z.string().min(1, { message: 'Informe o nome.' }),
  email: z.string().min(1, { message: 'Informe o email.' })
})

type Values = z.input<typeof schema>
type Action = (
  state: FormState<Values>,
  formData: FormData
) => Promise<FormState<Values>>

const TestForm = ({ action }: { action: Action }) => {
  const { Form, Field, state, pending, announcement, formProps } =
    useFormAction({
      schema,
      defaultValues: { name: '', email: '' },
      action
    })

  return (
    <Form {...formProps}>
      <Field name="name" label="Nome" />
      <Field name="email" label="Email" />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Enviar</SubmitButton>
    </Form>
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

    expect(screen.getByRole('textbox', { name: 'Nome', description: '' })).toBe(
      name
    )
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
    expect(
      screen.getByRole('textbox', { name: 'Email', description: '' })
    ).toBe(email)
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

  test('reveals an error only once the focus leaves for another field', async () => {
    const { user, name, email } = setup(answerWithFieldErrors({}))

    await user.type(name, 'a')
    await user.clear(name)
    expect(screen.getByRole('textbox', { name: 'Nome', description: '' })).toBe(
      name
    )
    await user.tab()

    expect(document.activeElement).toBe(email)
    expect(
      screen.getByRole('textbox', {
        name: 'Nome',
        description: 'Informe o nome.'
      })
    ).toBe(name)
  })

  test('announces the first field error in screen order on every rejected submit', async () => {
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

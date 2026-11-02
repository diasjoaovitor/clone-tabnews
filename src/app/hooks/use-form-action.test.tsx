import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { z } from 'zod'

import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { useFormAction } from '@/app/hooks/use-form-action'
import { formError, type FormState, formSuccess } from '@/entry/form-action'
import { checkboxSchema, listSchema } from '@/infra/form-schema'

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

const controlSchema = z.object({
  body: z.string().min(1, { message: 'Escreva o conteúdo.' }),
  notify: checkboxSchema(),
  tags: listSchema(z.string()),
  attachment: z.file().optional()
})

type ControlValues = z.input<typeof controlSchema>
type ControlAction = (
  state: FormState<ControlValues>,
  formData: FormData
) => Promise<FormState<ControlValues>>

const ControlForm = ({
  action,
  initialState
}: {
  action: ControlAction
  initialState?: FormState<ControlValues>
}) => {
  const { Form, Control, state, pending, announcement, formProps } =
    useFormAction({
      schema: controlSchema,
      defaultValues: {
        body: '',
        notify: true,
        tags: [],
        attachment: undefined
      },
      action,
      initialState
    })

  return (
    <Form {...formProps}>
      <Control
        name="body"
        label="Conteúdo"
        render={({ value, onValueChange, ...control }) => (
          <textarea
            {...control}
            value={value as string}
            onChange={(event) => onValueChange(event.target.value)}
          />
        )}
      />
      <Control
        name="notify"
        label="Avisar quem me segue"
        render={({ value, onValueChange, ...control }) => (
          <input
            {...control}
            type="checkbox"
            checked={value as boolean}
            onChange={(event) => onValueChange(event.target.checked)}
          />
        )}
      />
      <Control
        name="tags"
        label="Tags"
        render={({ value, onValueChange, ...control }) => (
          <select
            {...control}
            multiple
            value={value as string[]}
            onChange={(event) =>
              onValueChange(
                [...event.target.selectedOptions].map((option) => option.value)
              )
            }
          >
            <option>next</option>
            <option>react</option>
            <option>zod</option>
          </select>
        )}
      />
      <Control
        name="attachment"
        label="Anexo"
        render={({ onValueChange, ...control }) => (
          <input
            name={control.name}
            id={control.id}
            aria-invalid={control['aria-invalid']}
            aria-describedby={control['aria-describedby']}
            onBlur={control.onBlur}
            type="file"
            onChange={(event) => onValueChange(event.target.files?.[0])}
          />
        )}
      />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Publicar</SubmitButton>
    </Form>
  )
}

const setupControls = (initialState?: FormState<ControlValues>) => {
  const user = userEvent.setup()
  const action = vi.fn<ControlAction>(async () => formSuccess('Publicado.'))
  render(<ControlForm action={action} initialState={initialState} />)
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

const submittedFormData = (
  action: ReturnType<typeof setupControls>['action']
) => action.mock.calls[0]![1]

describe('useFormAction with controls other than text inputs', () => {
  test('submits each value the way the browser posts it without JavaScript', async () => {
    const { user, action, body, tags, attachment, submit } = setupControls()
    const file = new File(['oi'], 'nota.txt')

    await user.type(body, 'Olá')
    await user.selectOptions(tags, ['next', 'zod'])
    await user.upload(attachment, file)
    await user.click(submit)

    await waitFor(() => expect(action).toHaveBeenCalled())
    const formData = submittedFormData(action)
    expect(formData.get('body')).toBe('Olá')
    expect(formData.get('notify')).toBe('on')
    expect(formData.getAll('tags')).toEqual(['next', 'zod'])
    expect(formData.get('attachment')).toBe(file)
  })

  test('leaves an unchecked box and an empty list out of the submit', async () => {
    const { user, action, body, notify, submit } = setupControls()

    await user.type(body, 'Olá')
    await user.click(notify)
    await user.click(submit)

    await waitFor(() => expect(action).toHaveBeenCalled())
    const formData = submittedFormData(action)
    expect(formData.has('notify')).toBe(false)
    expect(formData.has('tags')).toBe(false)
    expect(formData.has('attachment')).toBe(false)
  })

  test('moves the focus to an invalid textarea', async () => {
    const { user, action, body, submit } = setupControls()

    await user.click(submit)

    await waitFor(() => expect(document.activeElement).toBe(body))
    expect(action).not.toHaveBeenCalled()
  })

  test('restores the values echoed after a post without JavaScript by the type of each default', () => {
    const { body, notify, tags } = setupControls(
      formError<ControlValues>({
        message: 'Tente de novo.',
        values: { body: 'Olá', tags: 'react' }
      })
    )

    expect(body).toHaveProperty('value', 'Olá')
    expect(notify).toHaveProperty('checked', false)
    expect(
      [...(tags as HTMLSelectElement).selectedOptions].map(
        (option) => option.value
      )
    ).toEqual(['react'])
  })

  test('keeps the defaults when the error comes from the page, not from a submit', () => {
    const { notify } = setupControls(
      formError<ControlValues>({ message: 'O link expirou.' })
    )

    expect(notify).toHaveProperty('checked', true)
  })
})

'use client'

import { useForm, useSelector } from '@tanstack/react-form'
import {
  type FocusEvent,
  type ReactNode,
  startTransition,
  type SubmitEvent,
  useActionState,
  useEffect,
  useRef,
  useState
} from 'react'
import type { z } from 'zod'

import {
  ActionControl,
  type ActionControlProps,
  ActionField,
  type ActionFieldProps,
  ActionForm,
  type ActionFormFields,
  type FieldApi
} from '@/app/components/ui/custom/action-form'
import type { EchoedValues, FormState } from '@/entry/form-action'

type FormActionOptions<TSchema extends z.ZodObject> = {
  schema: TSchema
  defaultValues: z.input<TSchema>
  action: (
    state: FormState<z.input<TSchema>>,
    formData: FormData
  ) => Promise<FormState<z.input<TSchema>>>
  initialState?: FormState<z.input<TSchema>>
}

type Errors = Record<string, string | undefined>

const NO_ERRORS: Errors = {}

// TanStack stores whatever the validator returned: a string, a Standard Schema issue or a list
const messageOf = (error: unknown): string | undefined => {
  if (typeof error === 'string') return error
  if (Array.isArray(error))
    return error.map((item) => messageOf(item)).find(Boolean)
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
}

const NOT_SENT = new Set<unknown>([false, null, undefined])

const entryOf = (item: unknown): string | Blob | undefined => {
  if (NOT_SENT.has(item)) return
  if (item === true) return 'on'
  return item instanceof Blob ? item : String(item)
}

// Built the way the browser posts the form without JavaScript, so the Server Action reads the same
// `FormData` either way: an unchecked box is left out and a list sends one entry per item
const toFormData = (values: Record<string, unknown>) => {
  const formData = new FormData()
  for (const [name, value] of Object.entries(values)) {
    for (const item of [value].flat()) {
      const entry = entryOf(item)
      if (entry !== undefined) formData.append(name, entry)
    }
  }
  return formData
}

// The echo after a post without JavaScript is text only, and leaves out an unchecked box or an
// empty list, so each value is read back by the type of its default
const restoreValues = (
  defaultValues: Record<string, unknown>,
  echoed: EchoedValues
) =>
  Object.fromEntries(
    Object.entries(defaultValues).map(([name, fallback]) => {
      const value = echoed[name]
      if (typeof fallback === 'boolean') return [name, value !== undefined]
      if (Array.isArray(fallback)) {
        return [name, value === undefined ? [] : [value].flat()]
      }
      return [name, value ?? fallback]
    })
  )

const isFocusableField = (
  element: Element
): element is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
  ((element instanceof HTMLInputElement && element.type !== 'hidden') ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement) &&
  // Base UI's Checkbox, Select and Switch carry the `name` on a visually hidden input that only
  // feeds the form, so the focus must not land there
  element.tabIndex >= 0 &&
  element.getAttribute('aria-hidden') !== 'true'

export const useFormAction = <TSchema extends z.ZodObject>({
  schema,
  defaultValues,
  action,
  initialState = { status: 'idle' }
}: FormActionOptions<TSchema>) => {
  const [state, dispatch, pending] = useActionState(action, initialState)
  const [invalidSubmit, setInvalidSubmit] = useState<{
    id: string
    errors: Errors
  }>()
  // A server error describes the submitted value, so it hides once its field is edited
  const [editedAfter, setEditedAfter] = useState<Record<string, string>>({})
  const formElement = useRef<HTMLFormElement>(null)
  const serverErrors: Errors =
    state.status === 'error' ? state.errors : NO_ERRORS

  const form = useForm({
    defaultValues:
      state.status === 'error' && state.values
        ? (restoreValues(defaultValues, state.values) as z.input<TSchema>)
        : defaultValues,
    // Every change revalidates the whole form, so errors never go stale; they're only shown once
    // the field was left or the form submitted
    // TanStack can't prove that a generic schema validates synchronously
    validators: { onChange: schema as never },
    onSubmit: ({ value }) => {
      setInvalidSubmit(undefined)
      startTransition(() => dispatch(toFormData(value)))
    },
    onSubmitInvalid: ({ formApi }) => {
      const fields = formApi.getAllErrors().fields as Record<
        string,
        { errors: unknown[] }
      >
      setInvalidSubmit({
        id: crypto.randomUUID(),
        errors: Object.fromEntries(
          Object.entries(fields).map(([name, { errors }]) => [
            name,
            messageOf(errors)
          ])
        )
      })
    }
  })
  const submitted = useSelector(
    form.store,
    (formState) => formState.submissionAttempts > 0
  )

  // The latest submit wins: a client-side rejection, or else the Server Action's answer
  const errors = invalidSubmit?.errors ?? serverErrors
  const submitId =
    invalidSubmit?.id ?? (state.status === 'idle' ? undefined : state.id)
  // The schema's key order is the fields' order on screen
  const firstMessage = Object.keys(schema.shape)
    .map((name) => errors[name])
    .find(Boolean)

  // Runs after the commit, so the field already carries aria-invalid and its error description
  // when the focus reaches it
  useEffect(() => {
    if (!submitId) return
    const element = [...(formElement.current?.elements ?? [])].find(
      (element) => isFocusableField(element) && errors[element.name]
    )
    if (element instanceof HTMLElement) element.focus()
  }, [submitId, errors])

  const controlProps = (field: FieldApi) => {
    const clientError =
      submitted || field.state.meta.isBlurred
        ? messageOf(field.state.meta.errors)
        : undefined
    const serverError =
      state.status !== 'idle' && editedAfter[field.name] === state.id
        ? undefined
        : serverErrors[field.name]

    return {
      name: field.name,
      value: field.state.value,
      error: clientError ?? serverError,
      onValueChange: (value: unknown) => {
        if (state.status !== 'idle') {
          setEditedAfter((edited) => ({ ...edited, [field.name]: state.id }))
        }
        field.handleChange(value)
      },
      onBlur: (event: FocusEvent<HTMLElement>) => {
        // Revealing errors on the way to the submit button would move it under the pointer, and
        // the submit reveals them anyway
        const next = event.relatedTarget
        if (next instanceof HTMLButtonElement && next.type === 'submit') return
        field.handleBlur()
      }
    }
  }

  const fields: ActionFormFields = {
    Field: form.Field as unknown as ActionFormFields['Field'],
    controlProps
  }

  return {
    Form: ActionForm,
    // The same component, with `name` narrowed to the schema's fields
    Field: ActionField as (
      props: ActionFieldProps<keyof z.input<TSchema> & string>
    ) => ReactNode,
    Control: ActionControl as (
      props: ActionControlProps<keyof z.input<TSchema> & string>
    ) => ReactNode,
    state,
    pending,
    announcement:
      submitId && firstMessage
        ? { id: submitId, text: firstMessage }
        : undefined,
    formProps: {
      fields,
      ref: formElement,
      // Without JavaScript the browser posts straight to the Server Action, which validates the
      // same schema; with it, the submit is intercepted to validate on the client first
      action: dispatch,
      noValidate: true,
      onSubmit: (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        void form.handleSubmit()
      }
    }
  }
}

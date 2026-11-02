import { unstable_rethrow } from 'next/navigation'
import type { z } from 'zod'

import { session } from '@/entry/session'
import { normalizeError, ValidationError } from '@/infra/errors'

type FieldErrors<TValues> = Partial<Record<keyof TValues & string, string>>

export type EchoedValues<TValues = Record<string, unknown>> = Partial<
  Record<keyof TValues & string, string | string[]>
>

export type FormState<TValues = Record<string, unknown>> =
  | { status: 'idle' }
  | {
      status: 'error'
      // A repeated identical error must still update the UI and the live region, so each result is unique
      id: string
      message?: string
      action?: string
      errors: FieldErrors<TValues>
      // Refills the fields after a post without JavaScript, which re-renders the form from scratch.
      // Only a submit sets it, so a missing value there means an unchecked box or an empty list
      values?: EchoedValues<TValues>
    }
  | { status: 'success'; id: string; message: string }

export const formError = <TValues>(details: {
  message?: string
  action?: string
  errors?: FieldErrors<TValues>
  values?: EchoedValues<TValues>
}): FormState<TValues> => ({
  status: 'error',
  id: crypto.randomUUID(),
  message: details.message,
  action: details.action,
  errors: details.errors ?? {},
  values: details.values
})

export const formSuccess = <TValues>(message: string): FormState<TValues> => ({
  status: 'success',
  id: crypto.randomUUID(),
  message
})

type FormInput = Record<string, FormDataEntryValue | FormDataEntryValue[]>

// Without JavaScript the browser posts an empty file input as a nameless, empty file, while the
// client leaves the field out
const isEmptyFile = (value: FormDataEntryValue) =>
  value instanceof File && value.size === 0 && value.name === ''

// A single value stays a value, since a field doesn't say here whether it's a list:
// `listSchema()` reads it as one
const inputOf = (formData: FormData, schema: z.ZodObject): FormInput => {
  const input: FormInput = {}
  for (const field of Object.keys(schema.shape)) {
    const values = formData.getAll(field).filter((value) => !isEmptyFile(value))
    if (values.length === 0) continue
    input[field] = values.length === 1 ? values[0]! : values
  }
  return input
}

// Passwords are never sent back to the browser, not even to refill their own field
const isSecret = (field: string) => /password/i.test(field)

const valuesOf = (input: FormInput) => {
  const values: Record<string, string | string[]> = {}
  for (const [field, value] of Object.entries(input)) {
    if (isSecret(field)) continue
    if (typeof value === 'string') values[field] = value
    else if (Array.isArray(value)) {
      values[field] = value.filter((item) => typeof item === 'string')
    }
  }
  return values
}

export const formAction = async <TSchema extends z.ZodObject>(
  formData: FormData,
  schema: TSchema,
  handler: (input: z.input<TSchema>) => Promise<FormState<z.input<TSchema>>>
): Promise<FormState<z.input<TSchema>>> => {
  type Values = z.input<TSchema>
  const input = inputOf(formData, schema)
  const errorState = (details: {
    message?: string
    action?: string
    errors?: Record<string, string>
  }) =>
    formError<Values>({
      ...details,
      errors: details.errors as FieldErrors<Values> | undefined,
      values: valuesOf(input) as EchoedValues<Values>
    })

  try {
    await session.resolveAndClearInvalid()
    // The model validates the input with this same schema, so the type only names its fields
    return await handler(input as Values)
  } catch (error_) {
    // redirect() and notFound() work by throwing
    unstable_rethrow(error_)
    const error = normalizeError(error_)
    if (error.statusCode >= 500) console.error(error)
    if (error instanceof ValidationError && error.fields) {
      return errorState({ errors: error.fields })
    }
    return errorState({ message: error.message, action: error.action })
  }
}

import { unstable_rethrow } from 'next/navigation'

import { normalizeError, ValidationError } from '@/infra/errors'
import { session } from '@/infra/session'

type FieldValues<TValues> = Partial<Record<keyof TValues & string, string>>

export type FormState<TValues = Record<string, unknown>> =
  | { status: 'idle' }
  | {
      status: 'error'
      // A repeated identical error must still update the UI and the live region, so each result is unique
      id: string
      message?: string
      action?: string
      errors: FieldValues<TValues>
      // Refills the fields after a post without JavaScript, which re-renders the form from scratch
      values: FieldValues<TValues>
    }
  | { status: 'success'; id: string; message: string }

export const formError = <TValues>(details: {
  message?: string
  action?: string
  errors?: FieldValues<TValues>
  values?: FieldValues<TValues>
}): FormState<TValues> => ({
  status: 'error',
  id: crypto.randomUUID(),
  message: details.message,
  action: details.action,
  errors: details.errors ?? {},
  values: details.values ?? {}
})

export const formSuccess = <TValues>(message: string): FormState<TValues> => ({
  status: 'success',
  id: crypto.randomUUID(),
  message
})

// Passwords are never sent back to the browser, not even to refill their own field
const isSecret = (field: string) => /password/i.test(field)

const valuesOf = (input: Record<string, FormDataEntryValue>) =>
  Object.fromEntries(
    Object.entries(input).filter(
      ([field, value]) => !isSecret(field) && typeof value === 'string'
    )
  ) as Record<string, string>

export const formAction = async <TValues>(
  formData: FormData,
  handler: (
    input: Record<string, FormDataEntryValue>
  ) => Promise<FormState<TValues>>
): Promise<FormState<TValues>> => {
  // React adds its own `$ACTION_*` entries when the form posts without JavaScript
  const input = Object.fromEntries(
    [...formData].filter(([field]) => !field.startsWith('$ACTION'))
  )
  const errorState = (details: {
    message?: string
    action?: string
    errors?: Record<string, string>
  }) =>
    formError<TValues>({
      ...details,
      errors: details.errors as FieldValues<TValues> | undefined,
      values: valuesOf(input) as FieldValues<TValues>
    })

  try {
    await session.resolveAndClearInvalid()
    return await handler(input)
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

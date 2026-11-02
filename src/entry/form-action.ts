import { unstable_rethrow } from 'next/navigation'

import { session } from '@/entry/session'
import { normalizeError, ValidationError } from '@/infra/errors'

type FieldName<TValues> = keyof TValues & string

// A nested field goes by its dotted path, e.g. `links.0.url`
type FieldErrors<TValues> = Partial<
  Record<FieldName<TValues> | `${FieldName<TValues>}.${string}`, string>
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
    }
  | { status: 'success'; id: string; message: string }

export const formError = <TValues>(details: {
  message?: string
  action?: string
  errors?: FieldErrors<TValues>
}): FormState<TValues> => ({
  status: 'error',
  id: crypto.randomUUID(),
  message: details.message,
  action: details.action,
  errors: details.errors ?? {}
})

export const formSuccess = <TValues>(message: string): FormState<TValues> => ({
  status: 'success',
  id: crypto.randomUUID(),
  message
})

export const formAction = async <TInput>(
  input: TInput,
  handler: (input: TInput) => Promise<FormState<TInput>>
): Promise<FormState<TInput>> => {
  try {
    await session.resolveAndClearInvalid()
    return await handler(input)
  } catch (error_) {
    // redirect() and notFound() work by throwing
    unstable_rethrow(error_)
    const error = normalizeError(error_)
    if (error.statusCode >= 500) console.error(error)
    if (error instanceof ValidationError && error.fields) {
      return formError<TInput>({ errors: error.fields as FieldErrors<TInput> })
    }
    return formError<TInput>({ message: error.message, action: error.action })
  }
}

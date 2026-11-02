'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  type FocusEvent,
  startTransition,
  type SubmitEvent,
  useActionState,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  type DefaultValues,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  get,
  type Path,
  type Resolver,
  useForm
} from 'react-hook-form'
import type { z } from 'zod'

import type { FormState } from '@/entry/form-action'

type FormActionOptions<TValues extends FieldValues> = {
  schema: z.ZodType<unknown, TValues>
  defaultValues: DefaultValues<TValues>
  action: (
    state: FormState<TValues>,
    input: TValues
  ) => Promise<FormState<TValues>>
  initialState?: FormState<TValues>
}

type FieldOptions<TValues extends FieldValues> = {
  // RHF validates one field at a time, and its own `deps` would reveal an error on a field that
  // wasn't visited yet
  revalidates?: Path<TValues>
}

type Rejection = { id: string; text: string }

const serverRejectionOf = <TValues>(
  state: FormState<TValues>
): Rejection | undefined => {
  if (state.status !== 'error') return
  const text: unknown = Object.values(state.errors)[0]
  return typeof text === 'string' ? { id: state.id, text } : undefined
}

const firstMessageOf = (errors: object): string | undefined => {
  // A leaf also carries `ref`, a DOM element the search must not walk into. A string `type` tells a
  // leaf from a field that happens to be named `type`
  if ('type' in errors && typeof errors.type === 'string') {
    return 'message' in errors && typeof errors.message === 'string'
      ? errors.message
      : undefined
  }
  for (const value of Object.values(errors) as unknown[]) {
    const message =
      value && typeof value === 'object' ? firstMessageOf(value) : undefined
    if (message) return message
  }
}

export const useFormAction = <TValues extends FieldValues>({
  schema,
  defaultValues,
  action,
  initialState = { status: 'idle' }
}: FormActionOptions<TValues>) => {
  const [state, dispatch, pending] = useActionState(action, initialState)
  const [clientRejection, setClientRejection] = useState<Rejection>()
  const [supersededState, setSupersededState] = useState<FormState<TValues>>()
  const formElement = useRef<HTMLFormElement>(null)
  const focusedRejection = useRef<string>(undefined)

  const form = useForm<TValues>({
    // `raw` hands the action the input as typed: the model parses it again
    resolver: zodResolver(schema, undefined, {
      raw: true
    }) as unknown as Resolver<TValues>,
    defaultValues,
    mode: 'onTouched',
    // RHF focuses before the commit that adds aria-invalid and the error description, so the effect
    // below does it
    shouldFocusError: false
  })
  const { setError } = form
  const { errors } = form.formState

  // The latest submit wins, and a client-side rejection stays ahead of the Server Action's previous
  // answer until the next one arrives: a valid submit must not bring the old answer back meanwhile
  const visibleState: FormState<TValues> =
    state === supersededState ? { status: 'idle' } : state
  const announcement = clientRejection ?? serverRejectionOf(visibleState)

  useEffect(() => {
    if (state.status !== 'error') return
    for (const [name, message] of Object.entries(state.errors)) {
      setError(name as Path<TValues>, {
        type: 'server',
        message: message as string
      })
    }
  }, [state, setError])

  // setError only reaches the DOM on the next commit, hence `errors` here and the guard against
  // focusing again for the same rejection
  useEffect(() => {
    if (!announcement || focusedRejection.current === announcement.id) return
    const invalid = formElement.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]'
    )
    if (!invalid) return
    focusedRejection.current = announcement.id
    invalid.focus()
  }, [announcement, errors])

  const field = (
    name: Path<TValues>,
    { revalidates }: FieldOptions<TValues> = {}
  ) => {
    const registered = form.register(name, {
      onChange: () => {
        if (!revalidates) return
        const { isTouched, invalid } = form.getFieldState(revalidates)
        if (isTouched || invalid) void form.trigger(revalidates)
      }
    })

    return {
      ...registered,
      error: (get(errors, name) as FieldError | undefined)?.message,
      onBlur: async (event: FocusEvent<HTMLElement>) => {
        // Revealing an error here would move the button under the pointer between mousedown and
        // mouseup, losing the click, and the submit reveals it anyway
        const next = event.relatedTarget
        if (next instanceof HTMLButtonElement && next.type === 'submit') return
        await registered.onBlur(event)
      }
    }
  }

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    let message: string | undefined
    await form.handleSubmit(
      (values) => {
        setClientRejection(undefined)
        startTransition(() => dispatch(values))
      },
      (fieldErrors: FieldErrors<TValues>) => {
        message = firstMessageOf(fieldErrors)
      }
    )(event)
    // RHF only publishes the errors after this callback resolves. A rejection committed before them
    // sends the focus to a field that was already invalid, not to the first one
    if (message) {
      setClientRejection({ id: crypto.randomUUID(), text: message })
      setSupersededState(state)
    }
  }

  return {
    form,
    field,
    state: visibleState,
    pending,
    announcement,
    formProps: {
      ref: formElement,
      // A click before hydration posts natively: the default GET would put the password in the URL
      method: 'post',
      noValidate: true,
      onSubmit
    }
  }
}

'use client'

import { signIn } from '@/app/(pages)/(auth)/login/_components/action'
import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { useFormAction } from '@/app/hooks/use-form-action'
import { credentialsSchema } from '@/models/authentication-model/schema'

export const SignInForm = () => {
  const { Form, Field, state, pending, announcement, formProps } =
    useFormAction({
      schema: credentialsSchema,
      defaultValues: { email: '', password: '' },
      action: signIn
    })

  return (
    <Form {...formProps} className="flex flex-col gap-6">
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        spellCheck={false}
      />
      <Field
        name="password"
        label="Senha"
        type="password"
        autoComplete="current-password"
      />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Entrar</SubmitButton>
    </Form>
  )
}

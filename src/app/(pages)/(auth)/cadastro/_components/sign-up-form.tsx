'use client'

import { signUp } from '@/app/(pages)/(auth)/cadastro/_components/action'
import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { useFormAction } from '@/app/hooks/use-form-action'
import { registrationSchema } from '@/models/registration-model/schema'

export const SignUpForm = () => {
  const { Form, Field, state, pending, announcement, formProps } =
    useFormAction({
      schema: registrationSchema,
      defaultValues: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      action: signUp
    })

  return (
    <Form {...formProps} className="flex flex-col gap-6">
      <Field
        name="username"
        label="Username"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
      />
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
        hint="Mínimo de 8 caracteres."
        autoComplete="new-password"
      />
      <Field
        name="password_confirmation"
        label="Confirmação de senha"
        type="password"
        autoComplete="new-password"
      />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Criar conta</SubmitButton>
    </Form>
  )
}

'use client'

import { signUp } from '@/app/(pages)/(auth)/cadastro/_components/action'
import { FormField } from '@/app/components/ui/custom/form-field'
import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { useFormAction } from '@/app/hooks/use-form-action'
import { registrationSchema } from '@/models/registration-model/schema'

export const SignUpForm = () => {
  const { field, state, pending, announcement, formProps } = useFormAction({
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
    <form {...formProps} className="flex flex-col gap-6">
      <FormField
        label="Username"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        {...field('username')}
      />
      <FormField
        label="Email"
        type="email"
        autoComplete="email"
        spellCheck={false}
        {...field('email')}
      />
      <FormField
        label="Senha"
        type="password"
        hint="Mínimo de 8 caracteres."
        autoComplete="new-password"
        {...field('password', { revalidates: 'password_confirmation' })}
      />
      <FormField
        label="Confirmação de senha"
        type="password"
        autoComplete="new-password"
        {...field('password_confirmation')}
      />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Criar conta</SubmitButton>
    </form>
  )
}

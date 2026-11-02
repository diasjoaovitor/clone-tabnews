'use client'

import { signIn } from '@/app/(pages)/(auth)/login/_components/action'
import { FormField } from '@/app/components/ui/custom/form-field'
import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { useFormAction } from '@/app/hooks/use-form-action'
import { credentialsSchema } from '@/models/authentication-model/schema'

export const SignInForm = () => {
  const { field, state, pending, announcement, formProps } = useFormAction({
    schema: credentialsSchema,
    defaultValues: { email: '', password: '' },
    action: signIn
  })

  return (
    <form {...formProps} className="flex flex-col gap-6">
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
        autoComplete="current-password"
        {...field('password')}
      />
      <FormMessage state={state} announcement={announcement} />
      <SubmitButton pending={pending}>Entrar</SubmitButton>
    </form>
  )
}

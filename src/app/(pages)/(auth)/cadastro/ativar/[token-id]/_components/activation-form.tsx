'use client'

import { cn } from 'cn'
import Link from 'next/link'

import { activate } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/_components/action'
import { FormMessage } from '@/app/components/ui/custom/form-message'
import { SubmitButton } from '@/app/components/ui/custom/submit-button'
import { buttonVariants } from '@/app/components/ui/shadcn/button'
import { useFormAction } from '@/app/hooks/use-form-action'
import type { FormState } from '@/entry/form-action'
import {
  type ActivationTokenIdInput,
  activationTokenIdSchema
} from '@/models/activation-model/schema'

type ActivationFormProps = {
  tokenId: string
  initialState: FormState<ActivationTokenIdInput>
}

export const ActivationForm = ({
  tokenId,
  initialState
}: ActivationFormProps) => {
  const { Form, state, pending, announcement, formProps } = useFormAction({
    schema: activationTokenIdSchema,
    defaultValues: { token_id: tokenId },
    action: activate,
    initialState
  })

  return (
    <Form {...formProps} className="flex flex-col gap-6">
      <input type="hidden" name="token_id" value={tokenId} />
      <FormMessage state={state} announcement={announcement} />
      {state.status === 'success' ? (
        <Link href="/login" className={cn(buttonVariants(), 'w-full')}>
          Entrar
        </Link>
      ) : (
        state.status === 'idle' && (
          <SubmitButton pending={pending}>Ativar conta</SubmitButton>
        )
      )}
    </Form>
  )
}

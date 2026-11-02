'use server'

import type { ActivationState } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/data'
import { tokenErrorAsMessage } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/token-error'
import { formAction, formSuccess } from '@/entry/form-action'
import { gated } from '@/entry/gated'
import { activationModel } from '@/models/activation/model'
import type { ActivationTokenIdInput } from '@/models/activation/schema'

export const activate = async (
  input: ActivationTokenIdInput
): Promise<ActivationState> =>
  formAction(
    input,
    gated(async (_user, { token_id }: ActivationTokenIdInput) => {
      try {
        await activationModel.activateUserByTokenId(token_id)
      } catch (error) {
        throw tokenErrorAsMessage(error)
      }
      return formSuccess('Sua conta foi ativada.')
    }, 'read:activation_token')
  )

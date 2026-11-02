'use server'

import { tokenErrorAsMessage } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/token-error'
import { formAction, type FormState, formSuccess } from '@/entry/form-action'
import { gated } from '@/entry/gated'
import { activationModel } from '@/models/activation-model/model'
import type { ActivationTokenIdInput } from '@/models/activation-model/schema'

type ActivationState = FormState<ActivationTokenIdInput>

export const activate = async (
  _state: ActivationState,
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

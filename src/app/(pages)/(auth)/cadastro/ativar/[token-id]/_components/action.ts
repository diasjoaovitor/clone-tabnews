'use server'

import { tokenErrorAsMessage } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/token-error'
import { formAction, type FormState, formSuccess } from '@/infra/form-action'
import { gated } from '@/infra/gated'
import { activationModel } from '@/models/activation-model/model'
import type { ActivationTokenIdInput } from '@/models/activation-model/schema'

type ActivationState = FormState<ActivationTokenIdInput>

export const activate = async (
  _state: ActivationState,
  formData: FormData
): Promise<ActivationState> =>
  formAction(
    formData,
    gated(async (_user, input) => {
      try {
        await activationModel.activateUserByTokenId(String(input.token_id))
      } catch (error) {
        throw tokenErrorAsMessage(error)
      }
      return formSuccess('Sua conta foi ativada.')
    }, 'read:activation_token')
  )

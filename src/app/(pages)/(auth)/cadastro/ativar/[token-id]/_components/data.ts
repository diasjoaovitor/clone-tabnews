import { tokenErrorAsMessage } from '@/app/(pages)/(auth)/cadastro/ativar/[token-id]/token-error'
import { AppError } from '@/infra/errors'
import { formError, type FormState } from '@/infra/form-action'
import { gated } from '@/infra/gated'
import { activationModel } from '@/models/activation-model/model'
import type { ActivationTokenIdInput } from '@/models/activation-model/schema'

type ActivationState = FormState<ActivationTokenIdInput>

// Only reads the token: email link checkers open the link, so the account is activated by the
// button, never on page load
export const getActivationState = async (
  tokenId: string
): Promise<ActivationState> => {
  try {
    await gated(
      () => activationModel.findUniqueValidById(tokenId),
      'read:activation_token'
    )()
    return { status: 'idle' }
  } catch (error_) {
    const error = tokenErrorAsMessage(error_)
    if (error instanceof AppError && error.statusCode < 500) {
      return formError({ message: error.message, action: error.action })
    }
    throw error
  }
}

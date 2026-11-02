import { formError, type FormState } from '@/entry/form-action'
import { gated } from '@/entry/gated'
import { AppError } from '@/infra/errors'
import { activationModel } from '@/models/activation/model'
import type { ActivationTokenIdInput } from '@/models/activation/schema'

import { tokenErrorAsMessage } from './token-error'

export type ActivationState = FormState<ActivationTokenIdInput>

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

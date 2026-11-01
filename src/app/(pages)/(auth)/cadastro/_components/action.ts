'use server'

import { redirect } from 'next/navigation'

import { formAction, type FormState } from '@/entry/form-action'
import { gated } from '@/entry/gated'
import { registrationModel } from '@/models/registration-model/model'
import type { RegistrationInput } from '@/models/registration-model/schema'

type SignUpState = FormState<RegistrationInput>

export const signUp = async (
  _state: SignUpState,
  formData: FormData
): Promise<SignUpState> =>
  formAction(
    formData,
    gated(async (_user, input) => {
      await registrationModel.registerWithConfirmation(
        input as RegistrationInput
      )
      redirect('/cadastro/confirmar')
    }, 'create:user')
  )

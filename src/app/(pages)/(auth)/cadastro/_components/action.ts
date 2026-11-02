'use server'

import { redirect } from 'next/navigation'

import { formAction, type FormState } from '@/entry/form-action'
import { gated } from '@/entry/gated'
import { registrationModel } from '@/models/registration-model/model'
import type { RegistrationInput } from '@/models/registration-model/schema'

type SignUpState = FormState<RegistrationInput>

export const signUp = async (
  _state: SignUpState,
  input: RegistrationInput
): Promise<SignUpState> =>
  formAction(
    input,
    gated(async (_user, registration: RegistrationInput) => {
      await registrationModel.registerWithConfirmation(registration)
      redirect('/cadastro/confirmar')
    }, 'create:user')
  )

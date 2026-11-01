'use server'

import { redirect } from 'next/navigation'

import { formAction, type FormState } from '@/entry/form-action'
import { gated } from '@/entry/gated'
import { session } from '@/entry/session'
import { authenticationModel } from '@/models/authentication-model/model'
import type { CredentialsInput } from '@/models/authentication-model/schema'

type SignInState = FormState<CredentialsInput>

export const signIn = async (
  _state: SignInState,
  formData: FormData
): Promise<SignInState> =>
  formAction(
    formData,
    gated(async (_user, input) => {
      const newSession = await authenticationModel.signIn(
        input as CredentialsInput
      )
      await session.save(newSession.token)
      redirect('/')
    }, 'create:session')
  )

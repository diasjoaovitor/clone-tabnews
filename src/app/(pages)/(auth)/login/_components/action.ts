'use server'

import { redirect } from 'next/navigation'

import { formAction, type FormState } from '@/entry/form-action'
import { gated } from '@/entry/gated'
import { session } from '@/entry/session'
import { authenticationModel } from '@/models/authentication/model'
import type { CredentialsInput } from '@/models/authentication/schema'

type SignInState = FormState<CredentialsInput>

export const signIn = async (
  _state: SignInState,
  input: CredentialsInput
): Promise<SignInState> =>
  formAction(
    input,
    gated(async (_user, credentials: CredentialsInput) => {
      const newSession = await authenticationModel.signIn(credentials)
      await session.save(newSession.token)
      redirect('/')
    }, 'create:session')
  )

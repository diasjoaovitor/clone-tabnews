import { NextRequest, NextResponse } from 'next/server'

import { getSessionDto } from '@/dtos/session-dto'
import { controller } from '@/entry/controller'
import { readJsonBody } from '@/entry/request'
import { session } from '@/entry/session'
import { authenticationModel } from '@/models/authentication-model/model'
import { sessionModel } from '@/models/session-model/model'

const postHandler = async (request: NextRequest) => {
  const userInputValues = await readJsonBody(request)
  const newSession = await authenticationModel.signIn({
    email: userInputValues.email,
    password: userInputValues.password
  })
  await session.save(newSession.token)
  return NextResponse.json(getSessionDto(newSession), {
    status: 201
  })
}

const deleteHandler = async () => {
  const user = await session.getUser()
  const expiredSession = await sessionModel.expires(user.sessionId!)
  await session.clear()
  return NextResponse.json(getSessionDto(expiredSession), {
    status: 200
  })
}

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS } = controller({
  POST: { handler: postHandler, feature: 'create:session' },
  DELETE: { handler: deleteHandler, feature: 'read:session' }
})

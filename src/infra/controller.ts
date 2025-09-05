import * as cookie from 'cookie'
import { HTTP_METHOD, HTTP_METHODS } from 'next/dist/server/web/http'
import { NextRequest, NextResponse } from 'next/server'

import session from '@/server/models/session'

import {
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
  ValidationError
} from './errors'

type THandler = (req: NextRequest, context?: any) => Promise<NextResponse>

type TRequest = {
  [key in HTTP_METHOD]: THandler
}

const setSessionCookie = (sessionToken: string) => {
  const setCookie = cookie.serialize('session_id', sessionToken, {
    path: '/',
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  })
  const headers = new Headers()
  headers.set('Set-Cookie', setCookie)
  return headers
}

const clearSessionCookie = () => {
  const setCookie = cookie.serialize('session_id', 'invalid', {
    path: '/',
    maxAge: -1,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  })
  const headers = new Headers()
  headers.set('Set-Cookie', setCookie)
  return headers
}

const onNoMatchHandler = async () => {
  const publicErrorObject = new MethodNotAllowedError()
  return NextResponse.json(publicErrorObject, {
    status: publicErrorObject.statusCode
  })
}

const onErrorHandler = async (error: any) => {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    return NextResponse.json(error, {
      status: error.statusCode
    })
  }

  if (error instanceof UnauthorizedError) {
    const headers = clearSessionCookie()
    return NextResponse.json(error, {
      status: error.statusCode,
      headers
    })
  }

  const publicErrorObject = new InternalServerError({
    cause: error
  })
  console.error(publicErrorObject)
  return NextResponse.json(publicErrorObject, {
    status: publicErrorObject.statusCode
  })
}

const handleRequest = (request: Partial<TRequest>) => {
  const handler: Partial<TRequest> = {}
  for (const method of HTTP_METHODS) {
    const key = method as HTTP_METHOD
    const fn = request[key]
    handler[key] = fn
      ? (req: NextRequest, context?: any) =>
          fn(req, context).catch(onErrorHandler)
      : onNoMatchHandler
  }
  return handler as TRequest
}

const controller = {
  handleRequest,
  setSessionCookie,
  clearSessionCookie
}

export default controller

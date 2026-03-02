import * as cookie from 'cookie'
import { HTTP_METHOD, HTTP_METHODS } from 'next/dist/server/web/http'
import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

import { sessionModel } from '@/models'

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

const setSessionCookie = (sessionToken: string): Headers => {
  const setCookie = cookie.serialize('session_id', sessionToken, {
    path: '/',
    maxAge: sessionModel.EXPIRATION_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  })
  const headers = new Headers()
  headers.set('Set-Cookie', setCookie)
  return headers
}

const clearSessionCookie = (): Headers => {
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

const onNoMatchHandler = async (): Promise<NextResponse> => {
  const publicErrorObject = new MethodNotAllowedError()
  return NextResponse.json(publicErrorObject, {
    status: publicErrorObject.statusCode
  })
}

const onErrorHandler = async (error: any): Promise<NextResponse> => {
  if (error instanceof ZodError) {
    const publicErrorObject = new ValidationError({
      message: z.prettifyError(error)
    })
    return NextResponse.json(publicErrorObject, {
      status: publicErrorObject.statusCode
    })
  }

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

const handle = (request: Partial<TRequest>): TRequest => {
  const handler: Partial<TRequest> = {}
  for (const method of HTTP_METHODS) {
    const fn = request[method]
    handler[method] = fn
      ? (req: NextRequest, context?: any): Promise<NextResponse> =>
          fn(req, context).catch(onErrorHandler)
      : onNoMatchHandler
  }
  return handler as TRequest
}

export const controller = {
  handle,
  setSessionCookie,
  clearSessionCookie
}

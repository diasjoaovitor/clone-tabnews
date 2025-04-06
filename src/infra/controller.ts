import { NextRequest, NextResponse } from 'next/server'

import {
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ValidationError
} from './errors'

type THttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'

type THandler = (req: NextRequest, context?: any) => Promise<NextResponse>

type TRequest = {
  [key in THttpMethod]: THandler
}

const httpMethods: THttpMethod[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS'
]

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

  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error
  })
  console.error(publicErrorObject)
  return NextResponse.json(publicErrorObject, {
    status: publicErrorObject.statusCode
  })
}

export const controller = (request: Partial<TRequest>) => {
  const handler: Partial<TRequest> = {}
  for (const method of httpMethods) {
    const key = method as THttpMethod
    const fn = request[key]
    if (fn) {
      handler[key] = (req: NextRequest, context?: any) =>
        fn(req, context).catch(onErrorHandler)
    } else {
      handler[key] = onNoMatchHandler
    }
  }
  return handler as TRequest
}

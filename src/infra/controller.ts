import { HTTP_METHOD, HTTP_METHODS } from 'next/dist/server/web/http'
import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

import { TUserFeatures } from '@/constants'

import { can } from './authorization'
import {
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ServiceError,
  UnauthorizedError,
  ValidationError
} from './errors'
import { session } from './session'

type TRequest = (request: NextRequest, context?: any) => Promise<NextResponse>

type TRouteConfig = {
  handler: TRequest
  feature?: TUserFeatures
}

type TRequestsConfig = {
  [key in HTTP_METHOD]?: TRequest | TRouteConfig
}

type TRequestsResult = Record<HTTP_METHOD, TRequest>

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

  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ForbiddenError ||
    error instanceof ServiceError
  ) {
    return NextResponse.json(error, {
      status: error.statusCode
    })
  }

  if (error instanceof UnauthorizedError) {
    await session.clear()
    return NextResponse.json(error, {
      status: error.statusCode
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

export const controller = (
  availableRequests: Partial<TRequestsConfig>
): TRequestsResult => {
  const requests: Partial<TRequestsResult> = {}
  for (const method of HTTP_METHODS) {
    const routeDefinition = availableRequests[method]
    let fn: TRequest | undefined
    let feature: TUserFeatures | undefined
    if (typeof routeDefinition === 'function') {
      fn = routeDefinition
    } else {
      fn = routeDefinition?.handler
      feature = routeDefinition?.feature
    }
    const handler = async (
      req: NextRequest,
      context?: any
    ): Promise<NextResponse> => {
      try {
        if (feature) {
          const user = await session.getUser()
          can(user, feature)
        }
        const response = await fn!(req, context)
        return response
      } catch (error) {
        return onErrorHandler(error)
      }
    }
    requests[method] = fn ? handler : onNoMatchHandler
  }
  return requests as TRequestsResult
}

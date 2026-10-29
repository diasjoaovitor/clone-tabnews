import { HTTP_METHOD, HTTP_METHODS } from 'next/dist/server/web/http'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { UserFeature } from '@/constants/features'

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

// Each route types its own context (`RouteContext<'/api/v1/...'>`), and such a handler isn't assignable
// to one whose context is `unknown`
type RouteHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>

type RouteConfig = {
  handler: RouteHandler
  feature?: UserFeature
}

type RequestsConfig = {
  [key in HTTP_METHOD]?: RouteHandler | RouteConfig
}

type RequestsResult = Record<HTTP_METHOD, RouteHandler>

const onNoMatchHandler = async (): Promise<NextResponse> => {
  const publicErrorObject = new MethodNotAllowedError()
  return NextResponse.json(publicErrorObject, {
    status: publicErrorObject.statusCode
  })
}

const onErrorHandler = async (error: unknown): Promise<NextResponse> => {
  if (error instanceof ZodError) {
    const publicErrorObject = ValidationError.fromZodError(error)
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
  availableRequests: Partial<RequestsConfig>
): RequestsResult => {
  const requests: Partial<RequestsResult> = {}
  for (const method of HTTP_METHODS) {
    const routeDefinition = availableRequests[method]
    let routeHandler: RouteHandler | undefined
    let feature: UserFeature | undefined
    if (typeof routeDefinition === 'function') {
      routeHandler = routeDefinition
    } else {
      routeHandler = routeDefinition?.handler
      feature = routeDefinition?.feature
    }
    const handler = async (
      request: NextRequest,
      context?: Parameters<RouteHandler>[1]
    ): Promise<NextResponse> => {
      try {
        if (feature) {
          const user = await session.getUser()
          can(user, feature)
        }
        const response = await routeHandler!(request, context)
        return response
      } catch (error) {
        return onErrorHandler(error)
      }
    }
    requests[method] = routeHandler ? handler : onNoMatchHandler
  }
  return requests as RequestsResult
}

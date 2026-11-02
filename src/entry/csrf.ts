import { NextRequest } from 'next/server'

import { ForbiddenError, UnsupportedMediaTypeError } from '@/infra/errors'

import { SESSION_COOKIE_NAME } from './session'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

const isCrossOrigin = (request: NextRequest): boolean => {
  const secFetchSite = request.headers.get('sec-fetch-site')
  if (secFetchSite) {
    return secFetchSite !== 'same-origin' && secFetchSite !== 'none'
  }
  const origin = request.headers.get('origin')
  // Clients outside a browser send neither header, and only a browser can be tricked into sending the cookie
  if (!origin) return false
  try {
    return new URL(origin).host !== request.headers.get('host')
  } catch {
    return true
  }
}

const hasUnsupportedContentType = (request: NextRequest): boolean => {
  const mediaType = request.headers
    .get('content-type')
    ?.split(';', 1)[0]
    ?.trim()
    .toLowerCase()
  const hasBody =
    Number(request.headers.get('content-length')) > 0 ||
    request.headers.has('transfer-encoding')
  return (!!mediaType || hasBody) && mediaType !== 'application/json'
}

// `sameSite: 'lax'` doesn't cover another origin of the same site. Requiring JSON forces a CORS preflight,
// since a cross-origin `<form>` can only send a body as `text/plain`, `multipart/form-data` or urlencoded
export const rejectUnsafeCookieRequest = (request: NextRequest): void => {
  if (SAFE_METHODS.has(request.method)) return
  if (!request.cookies.has(SESSION_COOKIE_NAME)) return
  if (isCrossOrigin(request)) {
    throw new ForbiddenError({
      message:
        'Requisições autenticadas por cookie não podem ser feitas a partir de outra origem.',
      action: 'Faça a requisição a partir da mesma origem da API.'
    })
  }
  if (hasUnsupportedContentType(request)) {
    throw new UnsupportedMediaTypeError()
  }
}

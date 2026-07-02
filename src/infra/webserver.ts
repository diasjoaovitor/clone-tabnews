import { InternalServerError } from './errors'

const getOrigin = (): string => {
  if (['test', 'development'].includes(process.env.NODE_ENV)) {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new InternalServerError({
        cause: 'NEXT_PUBLIC_BASE_URL não foi definida.'
      })
    }
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  if (process.env.VERCEL_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'https://diasjoaovitor.com.br'
}

export const webserver = {
  origin: getOrigin()
}

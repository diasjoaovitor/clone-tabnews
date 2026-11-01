const getOrigin = (): string => {
  if (['test', 'development'].includes(process.env.NODE_ENV)) {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not set.')
    }
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  if (process.env.VERCEL_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'https://diasjoaovitor.com.br'
}

export const APP_BASE_URL = getOrigin()

export const API_BASE_URL = `${APP_BASE_URL}/api/v1`

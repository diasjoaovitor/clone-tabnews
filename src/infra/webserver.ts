const getOrigin = (): string => {
  if (['test', 'development'].includes(process.env.NODE_ENV)) {
    return process.env.NEXT_PUBLIC_BASE_URL!
  }

  if (process.env.VERCEL_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'https://fintab.com.br'
}

export const webserver = {
  origin: getOrigin()
}

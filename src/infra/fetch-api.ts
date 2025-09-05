import { API_BASE_URL } from '@/shared/constants'

export const fetchApi = async <T>(
  path: string,
  options?: RequestInit,
  errorMessage?: string
): Promise<T> => {
  const response = await fetch(API_BASE_URL + path, options)
  if (!response.ok) {
    throw new Error(errorMessage || 'Failed to fetch data')
  }
  return response.json()
}

import { TStringToDate } from '@/types'

export const formatUsername = (text: string): string =>
  text.normalize('NFD').replace(/[^a-zA-Z0-9]/g, '')

type TIsoStringFields = {
  created_at?: string
  updated_at?: string
  expires_at?: string
  used_at?: string | null
}

export const isoStringFieldsToDate = <T extends TIsoStringFields>(
  object: T
): T & TStringToDate<TIsoStringFields> => {
  const dateObject: TStringToDate<TIsoStringFields> = {}
  if (object.created_at) {
    dateObject.created_at = new Date(object.created_at)
  }
  if (object.updated_at) {
    dateObject.updated_at = new Date(object.updated_at)
  }
  if (object.expires_at) {
    dateObject.expires_at = new Date(object.expires_at)
  }
  if (object.used_at) {
    dateObject.used_at = new Date(object.used_at)
  }
  return { ...object, ...dateObject }
}

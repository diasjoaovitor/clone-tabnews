import { StringToDate } from '@/tests/_types/generics'

export const formatUsername = (text: string): string =>
  text.normalize('NFD').replaceAll(/[^a-zA-Z0-9]/g, '')

type IsoStringFields = {
  created_at?: string
  updated_at?: string
  expires_at?: string
  used_at?: string | null
}

export const isoStringFieldsToDate = <T extends IsoStringFields>(
  object: T
): T & StringToDate<IsoStringFields> => {
  const dateObject: StringToDate<IsoStringFields> = {}
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

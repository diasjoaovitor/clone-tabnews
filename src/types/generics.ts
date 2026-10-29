import { UserSession } from '@/infra/session'

type AutomaticFields = 'id' | 'created_at' | 'updated_at'

export type DataInput<T> = T extends readonly (infer U)[]
  ? Omit<U, AutomaticFields>[]
  : Omit<T, AutomaticFields>

export type DtoGetter<T, R> = (user: UserSession | null, data: T) => R

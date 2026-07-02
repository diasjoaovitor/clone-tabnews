import { TUserSession } from '@/infra'

type TAutomaticFields = 'id' | 'created_at' | 'updated_at'

export type TDataInput<T> = T extends readonly (infer U)[]
  ? Omit<U, TAutomaticFields>[]
  : Omit<T, TAutomaticFields>

export type TGetDto<T, R> = (user: TUserSession | null, data: T) => R

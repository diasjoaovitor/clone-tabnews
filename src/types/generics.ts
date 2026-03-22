import { TUserSession } from '@/infra'

type TAutomaticFields = 'id' | 'created_at' | 'updated_at'

export type TDataInput<T> = T extends readonly (infer U)[]
  ? Omit<U, TAutomaticFields>[]
  : Omit<T, TAutomaticFields>

type TDateToString<T> = T extends Date
  ? string
  : T extends object
    ? { [K in keyof T]: TDateToString<T[K]> }
    : T

export type TStringToDate<T> = T extends string
  ? Date
  : T extends object
    ? { [K in keyof T]: TStringToDate<T[K]> }
    : T

export type TApiResponse<T> = T extends readonly (infer U)[]
  ? TDateToString<U>[]
  : TDateToString<T>

export type TGetDto<T, R> = (user: TUserSession | null, data: T) => R

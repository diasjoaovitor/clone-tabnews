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

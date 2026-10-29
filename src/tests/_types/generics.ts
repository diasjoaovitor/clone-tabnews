type DateToString<T> = T extends Date
  ? string
  : T extends object
    ? { [K in keyof T]: DateToString<T[K]> }
    : T

export type StringToDate<T> = T extends string
  ? Date
  : T extends object
    ? { [K in keyof T]: StringToDate<T[K]> }
    : T

export type ApiResponse<T> = T extends readonly (infer U)[]
  ? DateToString<U>[]
  : DateToString<T>

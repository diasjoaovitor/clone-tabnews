import { z } from 'zod'

// The same schema validates the form's state on the client (`true`/`false`, arrays) and the
// `FormData` on the server, where an unchecked box is missing, a checked one posts its `value`
// attribute (whatever it is) and a list with a single item arrives as that item
export const checkboxSchema = () =>
  z.preprocess(
    (value) => value !== undefined && value !== null && value !== false,
    z.boolean()
  )

export const listSchema = <TItem extends z.ZodType>(item: TItem) =>
  z.preprocess(
    (value) => (value === undefined ? [] : [value].flat()),
    z.array(item)
  )

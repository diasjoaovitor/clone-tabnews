import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { checkboxSchema, listSchema } from '@/infra/form-schema'

describe('checkboxSchema', () => {
  test.each([
    [true, true],
    ['on', true],
    ['true', true],
    [false, false],
    [undefined, false]
  ])('reads %o as %o', (value, expected) => {
    expect(checkboxSchema().parse(value)).toBe(expected)
  })
})

describe('listSchema', () => {
  const schema = listSchema(z.string())

  test.each([
    [
      ['a', 'b'],
      ['a', 'b']
    ],
    ['a', ['a']],
    [undefined, []]
  ])('reads %o as %o', (value, expected) => {
    expect(schema.parse(value)).toEqual(expected)
  })
})

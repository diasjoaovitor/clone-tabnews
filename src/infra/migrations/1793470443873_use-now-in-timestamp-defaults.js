/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.alterColumn('users', 'created_at', { default: pgm.func('now()') })
  pgm.alterColumn('users', 'updated_at', { default: pgm.func('now()') })

  pgm.alterColumn('sessions', 'expires_at', {
    default: pgm.func("now() + interval '30 days'")
  })
  pgm.alterColumn('sessions', 'created_at', { default: pgm.func('now()') })
  pgm.alterColumn('sessions', 'updated_at', { default: pgm.func('now()') })

  pgm.alterColumn('user_activation_tokens', 'created_at', {
    default: pgm.func('now()')
  })
  pgm.alterColumn('user_activation_tokens', 'updated_at', {
    default: pgm.func('now()')
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = false

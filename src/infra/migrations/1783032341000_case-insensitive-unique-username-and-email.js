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
  pgm.dropConstraint('users', 'users_username_key')
  pgm.dropConstraint('users', 'users_email_key')

  pgm.sql(
    'CREATE UNIQUE INDEX users_username_lower_key ON users (LOWER(username));'
  )
  pgm.sql('CREATE UNIQUE INDEX users_email_lower_key ON users (LOWER(email));')
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = false

import { InternalServerError } from '@/infra/errors'
import { User } from '@/repositories/user-repository/types'
import { DtoGetter } from '@/types/generics'

export type UserDto = Pick<
  User,
  'id' | 'username' | 'created_at' | 'updated_at' | 'features'
> & {
  email?: string
}

export const getUserDto: DtoGetter<User, UserDto> = (sessionUser, user) => {
  if (!sessionUser) {
    throw new InternalServerError({
      cause:
        'É necessário fornecer um usuário (anônimo ou autenticado) em "getUserDto".'
    })
  }

  if (sessionUser.id === user.id) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      features: user.features,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  }

  return {
    id: user.id,
    username: user.username,
    features: user.features,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
}

import { InternalServerError } from '@/infra'
import { TUser } from '@/repositories'
import { TGetDto } from '@/types'

export type TUserDto = Pick<
  TUser,
  'id' | 'username' | 'created_at' | 'updated_at' | 'features'
> & {
  email?: string
}

export const getUserDto: TGetDto<TUser, TUserDto> = (sessionUser, user) => {
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

import { User } from '@/repositories/user/types'
import { DtoGetter } from '@/types/generics'

export type UserDto = Pick<
  User,
  'id' | 'username' | 'created_at' | 'updated_at' | 'features'
> & {
  email?: string
}

export const getUserDto: DtoGetter<User, UserDto> = (sessionUser, user) => {
  const publicFields = {
    id: user.id,
    username: user.username,
    features: user.features,
    created_at: user.created_at,
    updated_at: user.updated_at
  }

  return sessionUser.id === user.id
    ? { ...publicFields, email: user.email }
    : publicFields
}

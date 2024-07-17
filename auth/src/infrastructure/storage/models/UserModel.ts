import { User } from '@/domain/core/User'
import { UserFactory } from '@/domain/factories/UserFactory.js'

export interface UserDBEntity {
  id: string
  username: string
  password: string
  role: string
  refreshToken: string
  permissions: string[]
}

export class UserDBAdapter {
  static asDomainEntity(user: UserDBEntity): User {
    return UserFactory.userFrom(
      UserFactory.idOf(user.id),
      user.username,
      user.password,
      user.role,
      user.permissions,
      '',
      user.refreshToken
    )
  }

  static asDBEntity(user: User): UserDBEntity {
    return {
      id: user.id.value,
      username: user.username,
      password: user.password,
      role: user.role,
      permissions: user.permissions,
      refreshToken: user.refreshToken
    }
  }
}

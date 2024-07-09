import { User } from '../core/User.js'
import { UserId } from '../core/UserId'

export class UserFactory {
  static newId(): UserId {
    return { value: 'test' }
  }

  static idOf(value: string): UserId {
    return { value }
  }

  static userFrom(
    id: UserId,
    username: string,
    password: string,
    permissions: string[],
    accessToken: string,
    refreshToken: string
  ): User {
    return {
      id,
      username,
      password,
      permissions,
      accessToken,
      refreshToken
    }
  }

  static createUser(
    username: string,
    password: string,
    permissions: string[],
    accessToken: string,
    refreshToken: string
  ): User {
    return this.userFrom(this.newId(), username, password, permissions, accessToken, refreshToken)
  }
}

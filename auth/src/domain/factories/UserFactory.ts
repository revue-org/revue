import { User } from '../core/User.js'
import { UserId } from '../core/UserId'
import { v4 as uuidv4 } from 'uuid'

export class UserFactory {
  static newId(): UserId {
    return { value: uuidv4() }
  }

  static idOf(value: string): UserId {
    return { value }
  }

  static userFrom(
    id: UserId,
    username: string,
    password: string,
    role: string,
    permissions: string[],
    accessToken: string,
    refreshToken: string
  ): User {
    return {
      id,
      username,
      password,
      role,
      permissions,
      accessToken,
      refreshToken
    }
  }

  static createUser(
    username: string,
    password: string,
    role: string,
    permissions: string[],
    accessToken: string,
    refreshToken: string
  ): User {
    return this.userFrom(this.newId(), username, password, role, permissions, accessToken, refreshToken)
  }
}

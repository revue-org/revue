import { User } from "../core/User.js";
import { UserId } from "../core/UserId";

export class UserFactory {
  static idOf(mail: string): UserId {
    return { mail };
  }

  static createUser(
    id: UserId,
    username: string,
    password: string,
    permissions: Permission[],
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
}

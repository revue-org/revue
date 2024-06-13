import { User } from "@/domain/core/User";
import { UserFactory } from "@/domain/factories/UserFactory";

export interface UserDBEntity {
    id: string
    username: string
    password: string
    refreshToken: string,
    permissions: string[]
}

export class UserDBAdapter {

    static asDomainEntity(user: UserDBEntity): User {
        return UserFactory.createUser(
          UserFactory.idOf(user.id),
          user.username,
          user.password,
          user.permissions,
          "",
          user.refreshToken
        )
    }

    static asDBEntity(user: User): UserDBEntity {
        return {
            id: user.id.mail,
            username: user.username,
            password: user.password,
            permissions: user.permissions,
            refreshToken: user.refreshToken
        }
    }
}
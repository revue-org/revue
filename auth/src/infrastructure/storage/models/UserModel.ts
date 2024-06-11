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
        const permissions: Permission[] = [];
        user.permissions.forEach(permission => permissions.push(PermissionFactory.create(permission.qualcosa, permission.qualcosaltro)));
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
        const permissions = user.permissions.map((permission: Permission) => {
            return {
                qualcosa: permission.qualcosa
                qualcosaltro: permission.qualcosaltro
            }
        })
        return {
            id: user.id.mail,
            username: user.username,
            password: user.password,
            permissions: permissions,
            refreshToken: user.refreshToken
        }
    }
}
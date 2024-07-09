import { Credentials, UserLogout } from '@/presentation/api/schemas/UserSchemas'

export interface UserAccessPresenter {
  parseCredentials(obj: object): Credentials

  parseLogout(obj: object): UserLogout
}

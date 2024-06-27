import { Credentials, UserLogout } from '../schemas/UserSchemas'
import { z } from 'zod'
import { UserAccessPresenter } from '@/presentation/api/UserAccessPresenter'

export class ZodUserAccessPresenter implements UserAccessPresenter {
  private readonly userLoginSchema
  private readonly userLogoutSchema

  constructor() {
    this.userLoginSchema = z.object({
      username: z.string(),
      password: z.string()
    })
    this.userLogoutSchema = z.object({
      username: z.string()
    })
  }

  parseCredentials(obj: object): Credentials {
    return this.userLoginSchema.parse(obj)
  }

  parseLogout(obj: object): UserLogout {
    return this.userLogoutSchema.parse(obj)
  }
}

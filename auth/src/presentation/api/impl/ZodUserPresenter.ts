import { UserPresenter } from '@/presentation/api/UserPresenter'
import { UserInsertion, UserUpdate } from '../schemas/UserSchemas'
import { z } from 'zod'

export class ZodUserPresenter implements UserPresenter {
  private readonly userInsertionSchema
  private readonly userPermissionsSchema

  constructor() {
    this.userInsertionSchema = z.object({
      username: z.string(),
      password: z.string(),
      permissions: z.array(z.string())
    })
    this.userPermissionsSchema = z.object({
      permissions: z.array(z.string())
    })
  }

  parseInsertion(obj: object): UserInsertion {
    return this.userInsertionSchema.parse(obj)
  }

  parseUpdate(obj: object): UserUpdate {
    return this.userPermissionsSchema.parse(obj)
  }
}

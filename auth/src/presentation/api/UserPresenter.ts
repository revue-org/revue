import { UserInsertion, UserUpdate } from '@/presentation/api/schemas/UserSchemas'

export interface UserPresenter {
  parseInsertion(obj: object): UserInsertion

  parseUpdate(obj: object): UserUpdate
}

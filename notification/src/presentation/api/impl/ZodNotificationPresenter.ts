import { z, ZodType } from 'zod'
import { Notification } from '@/domain/core/Notification'
import { NotificationPresenter } from '@/presentation/api/NotificationPresenter'
import { domainEventSchema } from 'common/dist/presentation/schemas/DomainEventSchema.js'

export class ZodNotificationPresenter implements NotificationPresenter {
  private readonly notificationSchema: ZodType<Notification>

  constructor() {
    this.notificationSchema = z.object({
      id: z.object({
        value: z.string()
      }),
      event: domainEventSchema,
      message: z.string()
    })
  }

  parse(obj: object): Notification {
    return this.notificationSchema.parse(obj)
  }
}

import { Notification } from '@/domain/core/Notification'

export interface NotificationPresenter {
  parse(obj: object): Notification
}

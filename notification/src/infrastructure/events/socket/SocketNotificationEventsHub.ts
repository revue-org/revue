import { Server as SocketIOServer } from 'socket.io'
import { Notification } from '@/domain/core/Notification'

export class SocketNotificationEventsHub {
  private readonly io: SocketIOServer

  constructor(server: SocketIOServer) {
    this.io = server
  }

  public publishNotification(notification: Notification): void {
    this.io.emit('notifications', { notification: notification })
  }
}

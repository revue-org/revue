import { Schema } from 'mongoose'
import { NotificationType } from '@/domain/core/enum/NotificationType'

export const notificationSchema = new Schema({
  notificationId: {
    type: String,
    required: true
  },
  notificationType: {
    type: String,
    enum: Object.values(NotificationType),
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
})

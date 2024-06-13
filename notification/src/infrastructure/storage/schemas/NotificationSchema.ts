import { Schema } from 'mongoose'
import { AnomalyType } from '../../../domain/alarm-system/core/impl/enum/AnomalyType.js'

export const notificationSchema = new Schema({
  notificationId: {
    type: String,
    required: true
  },
  notificationType: {
    type: String,
    enum: Object.values(AnomalyType),
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
})

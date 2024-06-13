import { Schema } from 'mongoose'
import { DomainEventType } from 'common/dist/domain/core/DomainEventType'

export const notificationSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(DomainEventType),
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  event: {
    type: Schema.Types.Mixed
  },
  message: {
    type: String,
    required: true
  }
})

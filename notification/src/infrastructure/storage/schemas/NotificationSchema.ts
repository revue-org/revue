import { Schema } from 'mongoose'

export const notificationSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(['outlier', 'intrusion']),
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

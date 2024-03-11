import { Schema } from 'mongoose'

export const notificationSchema = new Schema({
  anomalyId: {
    type: Schema.ObjectId,
    required: true
  },
  anomalyType: {
    type: String,
    enum: ['EXCEEDING', 'INTRUSION'],
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
})

import { Schema } from 'mongoose'

export const notificationSchema = new Schema({
  _id: Number,
  anomalyId: Number,
  anomalyType: String,
  timestamp: Date
})

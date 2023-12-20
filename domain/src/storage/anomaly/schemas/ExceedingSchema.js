import { Schema } from 'mongoose'

export const exceedingSchema = new Schema({
  _id: Number,
  deviceId: {
    type: String,
    code: String
  },
  timestamp: Date,
  value: Number,
  measure: String
})

import { Schema } from 'mongoose'

export const environmentDataSchema = new Schema({
  _id: String,
  deviceId: {
    type: String,
    code: String
  },
  value: Number,
  measure: String,
  timestamp: Date
})

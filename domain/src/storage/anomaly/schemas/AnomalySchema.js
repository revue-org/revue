import { Schema } from 'mongoose'

export const anomalySchema = new Schema({
  _id: String,
  deviceId: {
    type: String,
    code: String
  },
  timestamp: Date,
  intrusionObject: String,
  value: Number,
  measure: String
})

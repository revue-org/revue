import { Schema } from 'mongoose'

export const intrusionSchema = new Schema({
  _id: Number,
  deviceId: {
    type: String,
    code: String
  },
  timestamp: Date,
  intrusionObject: String
})

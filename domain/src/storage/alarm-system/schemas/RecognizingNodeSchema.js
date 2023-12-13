import { Schema } from 'mongoose'

export const recognizingNodeSchema = new Schema({
  _id: Number,
  ipAddress: String,
  deviceIds: [
    {
      type: String,
      code: String
    }
  ]
})

import { Schema } from 'mongoose'

export const cameraSchema = new Schema({
  _id: {
    type: String,
    code: String
  },
  ipAddress: String,
  resolution: {
    height: Number,
    width: Number
  }
})

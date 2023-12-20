import { Schema } from 'mongoose'

export const cameraSchema = new Schema({
  _id: {},
  ipAddress: String,
  resolution: {
    height: Number,
    width: Number
  }
})

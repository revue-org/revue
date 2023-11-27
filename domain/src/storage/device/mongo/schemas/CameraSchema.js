import { Schema, model } from 'mongoose'

export const cameraModel = new model(
  'Camera',
  new Schema({
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
)

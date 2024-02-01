import { Schema } from 'mongoose'
import { deviceIdSchema } from './DeviceIdSchema.js'
import { resolutionSchema } from './ResolutionSchema.js'

export const cameraSchema = new Schema({
  _id: {
    type: deviceIdSchema,
    required: true
  },
  isCapturing: {
    type: Boolean,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  resolution: {
    type: resolutionSchema,
    required: true
  }
})

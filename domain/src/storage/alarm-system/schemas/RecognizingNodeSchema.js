import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'

export const recognizingNodeSchema = new Schema({
  ipAddress: {
    type: String,
    required: true
  },
  deviceIds: {
    type: [deviceIdSchema],
    required: true
  }
})

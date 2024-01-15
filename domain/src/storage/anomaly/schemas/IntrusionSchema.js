import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'

export const intrusionSchema = new Schema({
  deviceId: {
    type: deviceIdSchema,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  intrusionObject: {
    type: String,
    enum: ['PERSON', 'ANIMAL', 'VEHICLE', 'OTHER'],
    required: true
  }
})

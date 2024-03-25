import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'
import { Measure } from '../../../domain/device/core/impl/enum/Measure.js'

export const exceedingSchema = new Schema({
  deviceId: {
    type: deviceIdSchema,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  },
  measure: {
    type: String,
    enum: Object.values(Measure),
    required: true
  }
})

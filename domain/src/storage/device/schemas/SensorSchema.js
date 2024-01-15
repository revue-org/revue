import { Schema } from 'mongoose'
import { deviceIdSchema } from './DeviceIdSchema.js'

export const sensorSchema = new Schema(
  {
    _id: {
      type: deviceIdSchema,
      required: true
    },
    ipAddress: {
      type: String,
      required: true
    },
    intervalMillis: {
      type: Number,
      required: true
    },
    measures: {
      type: [String],
      enum: ['TEMPERATURE', 'HUMIDITY', 'PRESSURE'],
      required: true
    }
  },
  { _id: false }
)

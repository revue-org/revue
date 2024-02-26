import { Schema } from 'mongoose'
import { deviceIdSchema } from './DeviceIdSchema.js'

export const environmentDataSchema = new Schema({
  deviceId: {
    type: deviceIdSchema,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  measure: {
    type: String,
    enum: ['TEMPERATURE', 'HUMIDITY', 'PRESSURE'],
    required: true
  },
  measureUnit: {
    type: String,
    enum: ['PASCAL', 'BAR', 'CELSIUS', 'FAHRENHEIT', 'KELVIN', 'PERCENTAGE'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

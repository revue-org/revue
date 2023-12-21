import { Schema } from 'mongoose'
import { deviceIdSchema } from "./DeviceIdSchema.js";

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
    enum: ['TEMPERATURE', 'HUMIDITY', 'PRESSURE'], //to add all from enum
    required: true
  },
  timestamp: {
    type: Date, 
    default: Date.now
  }
})

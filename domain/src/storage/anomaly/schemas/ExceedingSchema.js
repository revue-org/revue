import { Schema } from 'mongoose'
import { deviceIdSchema } from "../../device/schemas/DeviceIdSchema.js";

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
    enum: ['TEMPERATURE', 'HUMIDITY', 'PRESSURE'], //to add all from enum
    required: true
  }
})

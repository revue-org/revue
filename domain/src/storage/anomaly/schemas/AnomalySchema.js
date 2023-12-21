import { Schema } from 'mongoose'
import { deviceIdSchema } from "../../device/schemas/DeviceIdSchema.js";

export const anomalySchema = new Schema({
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

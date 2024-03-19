import { Schema } from 'mongoose'
import { deviceIdSchema } from './DeviceIdSchema.js'
import { Measure } from "../../../domain/device/core/impl/enum/Measure.js";

export const sensorSchema = new Schema(
  {
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
    intervalMillis: {
      type: Number,
      required: true
    },
    measures: {
      type: [String],
      enum: Object.values(Measure),
      required: true
    }
  },
  { _id: false }
)

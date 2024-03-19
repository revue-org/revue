import { Schema } from 'mongoose'
import { deviceIdSchema } from './DeviceIdSchema.js'
import { Measure } from "../../../domain/device/core/impl/enum/Measure.js";
import { MeasureUnit } from "../../../domain/device/core/impl/enum/MeasureUnit.js";

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
    enum: Object.values(Measure),
    required: true
  },
  measureUnit: {
    type: String,
    enum: Object.values(MeasureUnit),
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'
import { ObjectClass } from "../../../domain/alarm-system/core/impl/enum/ObjectClass.js";
import { Measure } from "../../../domain/device/core/impl/enum/Measure.js";

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
    enum: Object.values(ObjectClass),
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
  }
})

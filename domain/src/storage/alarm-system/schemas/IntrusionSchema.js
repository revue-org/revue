import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'
import { ObjectClass } from "../../../domain/alarm-system/core/impl/enum/ObjectClass.js";

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
    enum: Object.values(ObjectClass),
    required: true
  }
})

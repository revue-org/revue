import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'
import { contactSchema } from '../../monitoring/schemas/ContactSchema.js'
import { Measure } from '../../../domain/device/core/impl/enum/Measure.js'

export const exceedingRuleSchema = new Schema({
  deviceId: {
    type: deviceIdSchema,
    required: true
  },
  creatorId: {
    type: Schema.ObjectId,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  minValue: {
    type: Number,
    required: true
  },
  maxValue: {
    type: Number,
    required: true
  },
  measure: {
    type: String,
    enum: Object.values(Measure),
    required: true
  },
  contacts: {
    type: [contactSchema],
    required: true
  },
  from: {
    type: Date,
    default: Date.now
  },
  to: {
    type: Date,
    default: null
  }
})

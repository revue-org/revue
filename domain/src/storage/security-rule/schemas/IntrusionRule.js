import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'
import { contactSchema } from '../../monitoring/schemas/ContactSchema.js'

export const intrusionRuleSchema = new Schema({
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
  intrusionObject: {
    type: String,
    enum: ['PERSON', 'ANIMAL', 'VEHICLE'],
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

import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'
import { contactSchema } from '../../monitoring/schemas/ContactSchema.js'
import { ObjectClass } from '../../../domain/security-rule/core/impl/enum/ObjectClass.js'

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
  objectClass: {
    type: String,
    enum: Object.values(ObjectClass),
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

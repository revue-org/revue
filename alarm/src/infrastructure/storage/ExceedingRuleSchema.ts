import { Schema } from 'mongoose'

import { SecurityRuleDataSchema } from './SecurityRuleDataSchema'

export const securityRuleSchema = new Schema({
  deviceId: {
    type: deviceIdSchema,
    required: true
  },
  creatorId: {
    type: Schema.ObjectId, // userIdSchema
    required: true
  },
  from: {
    type: Date,
    default: Date.now
  },
  to: {
    type: Date,
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  contactsToNotify: {
    type: [contactSchema],
    required: true
  },
  data: {
    type: SecurityRuleDataSchema,
    required: true
  }
})

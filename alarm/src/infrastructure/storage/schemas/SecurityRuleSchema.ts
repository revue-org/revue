import { Schema } from 'mongoose'

const contactSchema = new Schema({
  type: {
    type: String,
    enum: ['email', 'sms'],
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const timeSlotSchema = new Schema({
  from: Date,
  to: Date
})

export const securityRuleSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['intrusion', 'range'],
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  activeOn: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  validity: {
    type: timeSlotSchema,
    required: true
  },
  contacts: {
    type: [contactSchema],
    required: true
  },
  data: {
    type: Schema.Types.Mixed
  },
  enabled: {
    type: Boolean,
    required: true
  }
})

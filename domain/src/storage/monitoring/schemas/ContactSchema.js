import { Schema } from 'mongoose'
import { ContactType } from '../../../domain/monitoring/core/impl/enum/ContactType.js'

export const contactSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(ContactType),
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

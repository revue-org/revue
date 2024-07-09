import { Schema } from 'mongoose'
import { ContactType } from 'common/dist/domain/core/ContactType.js'

const contactSchema = new Schema({
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

export const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  contacts: {
    type: [contactSchema],
    default: []
  }
})

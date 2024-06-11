import { Schema } from 'mongoose'
import { contactSchema } from './ContactSchema.js'

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

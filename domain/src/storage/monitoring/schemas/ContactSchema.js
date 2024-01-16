import { Schema } from 'mongoose'

export const contactSchema = new Schema({
  type: {
    type: String,
    enum: ['SMS', 'EMAIL'],
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

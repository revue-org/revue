import { Schema } from 'mongoose'

const deviceIdSchema = new Schema({
  type: {
    type: String,
    enum: ['camera', 'sensor'],
    required: true
  },
  code: {
    type: String,
    required: true
  }
})

const contactSchema = new Schema({
  type: String,
  code: String
})

export const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: ''
  },
  refreshToken: {
    type: String,
    default: ''
  },
  contact: {
    type: [contactSchema],
    default: []
  },
  deviceIds: {
    type: [deviceIdSchema],
    default: []
  }
})

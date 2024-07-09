import { Schema } from 'mongoose'

export const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
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
  refreshToken: {
    type: String,
    required: false,
    default: ''
  },
  permissions: {
    type: [String],
    default: []
  }
})

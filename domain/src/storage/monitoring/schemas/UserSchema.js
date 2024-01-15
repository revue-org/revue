import { Schema } from 'mongoose'
import { deviceIdSchema } from '../../device/schemas/DeviceIdSchema.js'
import { contactSchema } from './ContactSchema.js'

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
  contacts: {
    type: [contactSchema],
    default: []
  },
  deviceIds: {
    type: [deviceIdSchema],
    default: []
  }
})

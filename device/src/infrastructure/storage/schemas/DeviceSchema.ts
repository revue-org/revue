import { Schema } from 'mongoose'

export const deviceSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  locationId: String,
  description: String,
  endpoint: {
    ipAddress: String,
    port: Number
  },
  isEnabled: Boolean
})

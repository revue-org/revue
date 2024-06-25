import { Schema } from 'mongoose'

export const deviceSchema = new Schema({
  id: String,
  locationId: String,
  description: String,
  endpoint: {
    ipAddress: String,
    port: Number
  },
  isEnabled: Boolean
})

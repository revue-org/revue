import { Schema } from 'mongoose'

export const locationSchema = new Schema({
  id: String,
  description: String,
  address: String,
  external: Boolean,
  isRoom: Boolean,
  buildingId: String
})

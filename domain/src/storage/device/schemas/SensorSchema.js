import { Schema } from 'mongoose'

export const sensorSchema = new Schema({
  _id: {},
  ipAddress: String,
  intervalMillis: Number,
  measures: [String]
})

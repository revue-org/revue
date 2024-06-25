import { Schema } from 'mongoose'

export const numericMeasurementSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  sourceDeviceId: {
    type: String,
    required: true
  },
  measure: {
    type: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

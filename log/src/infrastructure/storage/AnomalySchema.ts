import { Schema } from 'mongoose'

export const anomalySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['outlier', 'intrusion'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  data : {
    type: Schema.Types.Mixed,
    required: true
  }
})

import { Schema } from 'mongoose'

export const intrusionRuleSchema = new Schema({
  _id: Number,
  deviceId: {
    type: String,
    code: String
  },
  creatorId: Number,
  description: String,
  intrusionObject: String,
  contacts: [
    {
      value: String,
      type: String
    }
  ],
  from: Date,
  to: Date
})

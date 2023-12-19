import { Schema } from 'mongoose'

export const intrusionRuleSchema = new Schema({
  _id: String,
  deviceId: {
    type: String,
    code: String
  },
  creatorId: String,
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

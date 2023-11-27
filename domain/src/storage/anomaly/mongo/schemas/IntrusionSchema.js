import { Schema, model } from 'mongoose'

const intrusionModel = new model(
  'Intrusion',
  new Schema({
    _id: Number,
    deviceId: {
      type: String,
      code: String
    },
    timestamp: Date,
    intrusionObject: String
  })
)

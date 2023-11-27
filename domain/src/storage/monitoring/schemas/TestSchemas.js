import { Schema, model } from 'mongoose'

export const userModel = new model(
  'User',
  new Schema({
    _id: Number,
    name: String,
    surname: String,
    contact: {
      value: String,
      type: String
    },
    deviceIds: [{
        type: String,
        code: String
    }]
  })
)

export const cameraModel = new model(
    'Device',
    new Schema({
        _id: {
            type: String,
            code: String
        },
        ipAddress: String,
        resolution: {
            height: Number,
            width: Number
        }
    })
)

export const sensorModel = new model(
    'Device',
    new Schema({
        _id: {
            type: String,
            code: String
        },
        ipAddress: String,
        intervalMillis: Number,
        measures: [String]
    })
)

import { Schema } from 'mongoose'
import { DeviceType } from '../../../domain/device/core/impl/enum/DeviceType.js'

export const deviceIdSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(DeviceType),
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  { _id: false }
)

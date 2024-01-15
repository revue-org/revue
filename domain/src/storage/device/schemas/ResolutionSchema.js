import { Schema } from 'mongoose'

export const resolutionSchema = new Schema(
  {
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  { _id: false }
)

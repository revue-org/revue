import { Schema } from "mongoose";

export const deviceIdSchema = new Schema({
  type: {
    type: String,
    enum: ['CAMERA', 'SENSOR'],
    required: true
  },
  code: {
    type: String,
    required: true
  }
})
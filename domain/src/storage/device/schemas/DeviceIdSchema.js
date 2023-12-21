import { Schema } from "mongoose";

export const deviceIdSchema = new Schema({
  type: {
    type: String,
    enum: ['camera', 'sensor'],
    required: true
  },
  code: {
    type: String,
    required: true
  }
})
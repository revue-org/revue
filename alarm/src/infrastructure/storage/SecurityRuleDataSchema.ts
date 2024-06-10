import { Schema } from 'mongoose'

export const rangeRuleDataSchema = new Schema({
  min: Number,
  max: Number,
  measureType: MeasureTypeSchema
})

export const intrusionRuleDataSchema = new Schema({
  objectClass: ObjectClassSchema
})

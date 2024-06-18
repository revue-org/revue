import { Measurement } from './Measurement'

export interface NumericMeasurement extends Measurement {
  readonly value: number
}

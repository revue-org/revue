import { Measurement } from './Measurement'
import { MeasureType } from './MeasureType'

export interface NumericMeasurement extends Measurement {
  readonly measureType: MeasureType

  readonly value: number
}

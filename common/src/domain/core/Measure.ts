import { MeasureType } from './MeasureType'
import { MeasureUnit } from './MeasureUnit'

export interface Measure {
  readonly type: MeasureType

  readonly unit: MeasureUnit
}

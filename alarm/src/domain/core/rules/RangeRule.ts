import { MeasureType } from 'common/dist/domain/core/MeasureType.js'
import { SecurityRule } from './SecurityRule.js'

export interface RangeRule extends SecurityRule {
  readonly type: 'range'

  readonly min: number

  readonly max: number

  readonly measure: MeasureType
}

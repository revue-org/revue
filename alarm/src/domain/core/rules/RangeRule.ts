import { SecurityRule } from './SecurityRule.js'
import { Measure } from '@common/domain/core'

export interface RangeRule extends SecurityRule {
  readonly type: 'range'

  readonly min: number

  readonly max: number

  readonly measure: Measure
}

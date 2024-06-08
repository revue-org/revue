import { SecurityRule } from './SecurityRule.js'

export interface RangeRule extends SecurityRule {

  readonly min: number

  readonly max: number

  readonly measure: MeasureType

}

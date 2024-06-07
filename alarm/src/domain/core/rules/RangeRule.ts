import { SecurityRule } from './SecurityRule.js'

export interface RangeRule extends SecurityRule {

  get min(): number

  get max(): number

  get measure(): MeasureType

}

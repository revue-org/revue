import { SecurityRule } from './SecurityRule'
import { Measure } from '../../device/core/Measure'

export interface ExceedingRule extends SecurityRule {
  get min(): number

  set min(min: number)

  get max(): number

  set max(max: number)

  get measure(): Measure

  set measure(measure: Measure)
}

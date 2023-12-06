import { Anomaly } from './Anomaly'
import { Measure } from '../../device/core/impl/enum/Measure'

export interface Exceeding extends Anomaly {
  get value(): number

  set value(value: number)

  get measure(): Measure

  set measure(measure: Measure)
}

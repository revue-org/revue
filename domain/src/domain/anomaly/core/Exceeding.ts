import { Anomaly } from './Anomaly.js'
import { Measure } from '../../device/core/impl/enum/Measure.js'

export interface Exceeding extends Anomaly {
  get value(): number

  set value(value: number)

  get measure(): Measure

  set measure(measure: Measure)
}

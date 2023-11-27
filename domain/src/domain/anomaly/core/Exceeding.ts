import { Anomaly } from './Anomaly'
import { Measure } from '../../device/core/Measure'

export interface Exceeding extends Anomaly {
  getValue(): number

  getMeasure(): Measure
}

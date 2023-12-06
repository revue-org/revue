import { Device } from './Device'
import { Measure } from './Measure'

export interface Sensor extends Device {
  get intervalMillis(): number

  set intervalMillis(intervalMillis: number)

  get measures(): Set<Measure>

  set measures(measures: Set<Measure>)

  addMeasure(): void

  sendEnvironmentData(): void
}

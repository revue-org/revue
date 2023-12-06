import { Device } from './Device'
import { Measure } from './impl/enum/Measure'

export interface Sensor extends Device {
  get intervalMillis(): number

  set intervalMillis(intervalMillis: number)

  get measures(): Set<Measure>

  set measures(measures: Set<Measure>)

  addMeasure(measure: Measure): void

  sendEnvironmentData(): void
}

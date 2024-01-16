import { Device } from './Device.js'
import { Measure } from './impl/enum/Measure.js'

export interface Sensor extends Device {
  get intervalMillis(): number

  set intervalMillis(intervalMillis: number)

  get measures(): Measure[]

  set measures(measures: Measure[])

  addMeasure(measure: Measure): void

  sendEnvironmentData(): void
}

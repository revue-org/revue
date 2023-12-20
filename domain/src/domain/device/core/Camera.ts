import { Device } from './Device.js'
import { Resolution } from './Resolution.js'

export interface Camera extends Device {
  get resolution(): Resolution
}

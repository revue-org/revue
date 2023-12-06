import { Device } from './Device'
import { Resolution } from './Resolution'

export interface Camera extends Device {
  get resolution(): Resolution
}

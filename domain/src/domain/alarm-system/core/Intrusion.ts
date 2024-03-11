import { Anomaly } from './Anomaly.js'
import { ObjectClass } from '../../alarm-system/core/impl/enum/ObjectClass.js'

export interface Intrusion extends Anomaly {
  get intrusionObject(): ObjectClass
}

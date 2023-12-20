import { Anomaly } from './Anomaly.js'
import { ObjectClass } from '../../security-rule/core/impl/ObjectClass.js'

export interface Intrusion extends Anomaly {
  get intrusionObject(): ObjectClass
}

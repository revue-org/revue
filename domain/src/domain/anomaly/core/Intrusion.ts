import { Anomaly } from './Anomaly'
import { ObjectClass } from '../../security-rule/core/impl/ObjectClass'

export interface Intrusion extends Anomaly {
  get intrusionObject(): ObjectClass
}

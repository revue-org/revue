import { Anomaly } from './Anomaly'
import { ObjectClass } from '../../security-rule/core/ObjectClass'

export interface Intrusion extends Anomaly {
  get intrusionObject(): ObjectClass
}

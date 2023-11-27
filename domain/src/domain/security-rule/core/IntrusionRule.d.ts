import { SecurityRule } from './SecurityRule'
import { ObjectClass } from './ObjectClass'
export interface IntrusionRule extends SecurityRule {
  getObjectClass(): ObjectClass
}

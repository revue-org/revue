import { SecurityRule } from './SecurityRule'
import { ObjectClass } from './impl/ObjectClass'

export interface IntrusionRule extends SecurityRule {
  get objectClass(): ObjectClass

  set objectClass(objectClass: ObjectClass)
}

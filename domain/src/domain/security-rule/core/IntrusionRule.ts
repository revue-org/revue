import { SecurityRule } from './SecurityRule'
import { ObjectClass } from './ObjectClass'

export interface IntrusionRule extends SecurityRule {
  get objectClass(): ObjectClass

  set objectClass(objectClass: ObjectClass)
}

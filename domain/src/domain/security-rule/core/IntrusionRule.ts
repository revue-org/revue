import { SecurityRule } from './SecurityRule.js'
import { ObjectClass } from './impl/enum/ObjectClass.js'

export interface IntrusionRule extends SecurityRule {
  get objectClass(): ObjectClass

  set objectClass(objectClass: ObjectClass)
}

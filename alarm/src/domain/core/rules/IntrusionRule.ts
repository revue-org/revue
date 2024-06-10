import { ObjectClass } from '../ObjectClass.js'
import { SecurityRule } from './SecurityRule.js'

export interface IntrusionRule extends SecurityRule {
  readonly type: 'intrusion'

  readonly objectClass: ObjectClass
}

import { SecurityRule } from './SecurityRule.js'
import { ObjectClass } from '@common/domain/core'

export interface IntrusionRule extends SecurityRule {
  readonly type: 'intrusion'

  readonly objectClass: ObjectClass
}

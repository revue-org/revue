import { TimeSlot } from './TimeSlot.js'
import { SecurityRuleId } from './SecurityRuleId.js'
import { Contact } from '@common/domain/core'

export type SecurityRuleType = 'range' | 'intrusion'

export interface SecurityRule {
  readonly type: SecurityRuleType

  readonly id: SecurityRuleId

  readonly creatorId: string

  readonly activeOn: string

  readonly description: string

  readonly contacts: Contact[]

  readonly enabled: boolean

  readonly validity: TimeSlot
}

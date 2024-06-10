import { TimeSlot } from './TimeSlot.js'
import { SecurityRuleId } from './SecurityRuleId.js'

export type SecurityRuleType = 'range' | 'intrusion'

export interface SecurityRule {
  readonly type: SecurityRuleType

  readonly id: SecurityRuleId

  readonly creatorId: UserId

  readonly activeOn: DeviceId

  readonly description: string

  readonly contacts: Contact[]

  readonly enabled: boolean

  readonly validity: TimeSlot
}

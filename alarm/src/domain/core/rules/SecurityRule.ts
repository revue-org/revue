import { TimeSlot } from './TimeSlot.js'
import { SecurityRuleId } from './SecurityRuleId.js'

export interface SecurityRule {

  readonly id: SecurityRuleId

  readonly creatorId: UserId

  readonly activeOn: DeviceId

  readonly description: string

  readonly contacts: Contact[]

  readonly enabled: boolean

  readonly validity: TimeSlot

}

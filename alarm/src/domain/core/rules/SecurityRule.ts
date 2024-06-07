import { TimeSlot } from './TimeSlot.js'
import { SecurityRuleId } from './SecurityRuleId.js'

export interface SecurityRule {

  get id(): SecurityRuleId

  get creatorId(): UserId

  get activeOn(): DeviceId

  get description(): string

  get contacts(): Contact[]

  get enabled(): boolean

  get validity(): TimeSlot

}

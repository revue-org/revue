import { Contact } from '../../monitoring/core/Contact'
import { DeviceId } from '../../device/core/DeviceId'

export interface SecurityRule {
  get securityRuleId(): number

  set securityRuleId(id: number)

  get deviceId(): DeviceId

  set deviceId(deviceId: DeviceId)

  get creatorId(): number

  set creatorId(creatorId: number)

  get contactsToNotify(): Set<Contact>

  set contactsToNotify(contactsToNotify: Set<Contact>)

  get description(): string

  set description(description: string)

  get from(): Date

  set from(from: Date)

  get to(): Date

  set to(to: Date)
}

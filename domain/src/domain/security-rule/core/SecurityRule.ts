import { Contact } from '../../monitoring/core/Contact.js'
import { DeviceId } from '../../device/core/DeviceId.js'

export interface SecurityRule {
  get securityRuleId(): string

  set securityRuleId(id: string)

  get deviceId(): DeviceId

  set deviceId(deviceId: DeviceId)

  get creatorId(): string

  get contactsToNotify(): Contact[]

  set contactsToNotify(contactsToNotify: Contact[])

  get description(): string

  set description(description: string)

  get from(): Date

  set from(from: Date)

  get to(): Date

  set to(to: Date)
}

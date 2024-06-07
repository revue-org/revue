import { IntrusionRule } from './IntrusionRule.js'
import { ObjectClass } from './enum/ObjectClass.js'
import { SecurityRuleId } from './SecurityRuleId.js'
import { TimeSlot } from './TimeSlot.js'

export class IntrusionRuleImpl implements IntrusionRule {
  private _securityRuleId: SecurityRuleId
  private _creatorId: UserId
  private _activeOn: DeviceId
  private _description: string
  private _contacts: Contact[]
  private _validity: TimeSlot
  private _objectClass: ObjectClass
  private _enabled: boolean

  constructor(
    objectClass: ObjectClass,
    securityRuleId: SecurityRuleId,
    activeOn: DeviceId,
    creatorId: UserId,
    contactsToNotify: Contact[],
    description: string,
    validity: TimeSlot,
    enabled: boolean
  ) {
    this._securityRuleId = securityRuleId
    this._creatorId = creatorId
    this._activeOn = activeOn
    this._contacts = contactsToNotify
    this._objectClass = objectClass
    this._description = description
    this._validity = validity
    this._enabled = enabled
  }

  get id(): SecurityRuleId {
    return this._securityRuleId
  }
  get creatorId(): UserId {
    return this._creatorId
  }

  get activeOn(): DeviceId {
    return this._activeOn
  }

  get contacts(): Contact[] {
    return this._contacts
  }

  get objectClass(): ObjectClass {
    return this._objectClass
  }

  get description(): string {
    return this._description
  }

  get validity(): TimeSlot {
    return this._validity
  }

  get enabled(): boolean {
    return this._enabled
  }

}

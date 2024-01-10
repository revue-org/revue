import { Contact } from '../../../monitoring/core/Contact.js'
import { DeviceId } from '../../../device/core/DeviceId.js'
import { IntrusionRule } from '../IntrusionRule.js'
import { ObjectClass } from './enum/ObjectClass.js'

export class IntrusionRuleImpl implements IntrusionRule {
  private _objectClass: ObjectClass
  private _securityRuleId: string
  private _deviceId: DeviceId
  private _creatorId: string
  private _contactsToNotify: Set<Contact>
  private _description: string
  private _from: Date
  private _to: Date

  constructor(
    objectClass: ObjectClass,
    securityRuleId: string,
    deviceId: DeviceId,
    creatorId: string,
    contactsToNotify: Set<Contact>,
    description: string,
    from: Date,
    to: Date
  ) {
    this._objectClass = objectClass
    this._securityRuleId = securityRuleId
    this._deviceId = deviceId
    this._creatorId = creatorId
    this._contactsToNotify = contactsToNotify
    this._description = description
    this._from = from
    this._to = to
  }

  get objectClass(): ObjectClass {
    return this._objectClass
  }

  set objectClass(objectClass: ObjectClass) {
    this._objectClass = objectClass
  }

  get securityRuleId(): string {
    return this._securityRuleId
  }

  set securityRuleId(id: string) {
    this._securityRuleId = id
  }

  get deviceId(): DeviceId {
    return this._deviceId
  }

  set deviceId(deviceId: DeviceId) {
    this._deviceId = deviceId
  }

  get creatorId(): string {
    return this._creatorId
  }

  set creatorId(creatorId: string) {
    this._creatorId = creatorId
  }

  get contactsToNotify(): Set<Contact> {
    return this._contactsToNotify
  }

  set contactsToNotify(contactsToNotify: Set<Contact>) {
    this._contactsToNotify = contactsToNotify
  }

  get description(): string {
    return this._description
  }

  set description(description: string) {
    this._description = description
  }

  get from(): Date {
    return this._from
  }

  set from(from: Date) {
    this._from = from
  }

  get to(): Date {
    return this._to
  }

  set to(to: Date) {
    this._to = to
  }
}

import { ExceedingRule } from '../ExceedingRule'
import { Contact } from '../../../monitoring/core/Contact'
import { DeviceId } from '../../../device/core/DeviceId'
import { Measure } from '../../../device/core/Measure'

export class ExceedingRuleImpl implements ExceedingRule {
  private _min: number
  private _max: number
  private _measure: Measure
  private _securityRuleId: number
  private _deviceId: DeviceId
  private _creatorId: number
  private _contactsToNotify: Set<Contact>
  private _description: string
  private _from: Date
  private _to: Date

  constructor(
    min: number,
    max: number,
    measure: Measure,
    securityRuleId: number,
    deviceId: DeviceId,
    creatorId: number,
    contactsToNotify: Set<Contact>,
    description: string,
    from: Date,
    to: Date
  ) {
    this._min = min
    this._max = max
    this._measure = measure
    this._securityRuleId = securityRuleId
    this._deviceId = deviceId
    this._creatorId = creatorId
    this._contactsToNotify = contactsToNotify
    this._description = description
    this._from = from
    this._to = to
  }

  get min(): number {
    return this._min
  }

  set min(min: number) {
    this._min = min
  }

  get max(): number {
    return this._max
  }

  set max(max: number) {
    this._max = max
  }

  get measure(): Measure {
    return this._measure
  }

  set measure(measure: Measure) {
    this._measure = measure
  }

  get securityRuleId(): number {
    return this._securityRuleId
  }

  set securityRuleId(id: number) {
    this._securityRuleId = id
  }

  get deviceId(): DeviceId {
    return this._deviceId
  }

  set deviceId(deviceId: DeviceId) {
    this._deviceId = deviceId
  }

  get creatorId(): number {
    return this._creatorId
  }

  set creatorId(creatorId: number) {
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

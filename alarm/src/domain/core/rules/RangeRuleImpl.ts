import { RangeRule } from './RangeRule.js'
import { SecurityRuleId } from './SecurityRuleId.js'

export class RangeRuleImpl implements RangeRule {
  private _min: number
  private _max: number
  private _measure: MeasureType
  private _id: SecurityRuleId
  private _activeOn: DeviceId
  private _creatorId: UserId
  private _contacts: Contact[]
  private _description: string
  private _validity: TimeSlot
  private _enabled: boolean

  constructor(
    min: number,
    max: number,
    measure: MeasureType,
    id: SecurityRuleId,
    activeOn: DeviceId,
    creatorId: UserId,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    enabled: boolean
  ) {
    this._min = min
    this._max = max
    this._measure = measure
    this._id = id
    this._activeOn = activeOn
    this._creatorId = creatorId
    this._contacts = contacts
    this._description = description
    this._validity = validity
    this._enabled = enabled
  }

  get min(): number {
    return this._min
  }

  get max(): number {
    return this._max
  }

  get measure(): Measure {
    return this._measure
  }

  get id(): SecurityRuleId {
    return this._id
  }

  get activeOn(): DeviceId {
    return this._activeOn
  }

  get creatorId(): UserId {
    return this._creatorId
  }

  get contacts(): Contact[] {
    return this._contacts
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

import { type Contact, type Measure, ObjectClass } from 'common/dist/domain/core'

interface TimeSlot {
  readonly from: Date

  readonly to: Date
}

export interface SecurityRule {
  readonly type: string

  readonly id: string

  readonly author: string

  readonly activeOn: string

  readonly description: string

  readonly contacts: Contact[]

  readonly enabled: boolean

  readonly validity: TimeSlot
}

export interface RangeRule extends SecurityRule {
  readonly type: 'range'

  readonly min: number

  readonly max: number

  readonly measure: Measure
}

export interface IntrusionRule extends SecurityRule {
  readonly type: 'intrusion'

  readonly objectClass: ObjectClass
}

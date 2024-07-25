import { TimeSlot } from '../core/rules/TimeSlot.js'
import { IntrusionRule } from '../core/rules/IntrusionRule.js'
import { RangeRule } from '../core/rules/RangeRule.js'
import { SecurityRuleId } from '../core/rules/SecurityRuleId.js'
import { Contact } from 'common/dist/domain/core/Contact.js'
import { Measure, ObjectClass } from '@common/domain/core'
import { v4 as uuidv4 } from 'uuid'

export class SecurityRulesFactory {
  static newId(): SecurityRuleId {
    return { value: uuidv4() }
  }

  static idOf(id: string): SecurityRuleId {
    return { value: id }
  }

  static intrusionRuleOf(
    id: SecurityRuleId,
    activeOn: string,
    creatorId: string,
    objectClass: ObjectClass,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    enabled: boolean
  ): IntrusionRule {
    return {
      id,
      type: 'intrusion',
      activeOn,
      creatorId,
      objectClass,
      contacts,
      description,
      validity,
      enabled
    }
  }

  static createIntrusionRule(
    activeOn: string,
    creatorId: string,
    objectClass: ObjectClass,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    enabled: boolean
  ): IntrusionRule {
    return this.intrusionRuleOf(
      this.newId(),
      activeOn,
      creatorId,
      objectClass,
      contacts,
      description,
      validity,
      enabled
    )
  }

  static rangeRuleOf(
    id: SecurityRuleId,
    activeOn: string,
    creatorId: string,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    min: number,
    max: number,
    measure: Measure,
    enabled: boolean
  ): RangeRule {
    return {
      id: id,
      type: 'range',
      activeOn,
      creatorId,
      contacts,
      description,
      validity,
      min,
      max,
      measure,
      enabled
    }
  }

  static createRangeRule(
    activeOn: string,
    creatorId: string,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    min: number,
    max: number,
    measure: Measure,
    enabled: boolean
  ): RangeRule {
    return this.rangeRuleOf(
      this.newId(),
      activeOn,
      creatorId,
      contacts,
      description,
      validity,
      min,
      max,
      measure,
      enabled
    )
  }

  static newTimeSlot(from: Date, to: Date): TimeSlot {
    if (from >= to) {
      throw new Error('Invalid time slot')
    }
    return { from, to }
  }
}

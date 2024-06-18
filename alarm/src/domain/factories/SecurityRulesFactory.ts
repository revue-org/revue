import { TimeSlot } from '../core/rules/TimeSlot.js'
import { IntrusionRule } from '../core/rules/IntrusionRule.js'
import { RangeRule } from '../core/rules/RangeRule.js'
import { SecurityRuleId } from '../core/rules/SecurityRuleId.js'
import { Contact } from 'common/dist/domain/core/Contact.js'
import { Measure, ObjectClass } from '@common/domain/core'

export class SecurityRulesFactory {
  static newId(): SecurityRuleId {
    return {
      id: 'test'
    }
  }

  static idOf(id: string): SecurityRuleId {
    return { id }
  }

  static createIntrusionRule(
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

  static createRangeRule(
    id: SecurityRuleId | string,
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
      id: typeof id === 'string' ? SecurityRulesFactory.idOf(id) : id,
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

  static newTimeSlot(from: Date, to: Date): TimeSlot {
    if (from >= to) {
      throw new Error('Invalid time slot')
    }
    return {
      from,
      to
    }
  }
}

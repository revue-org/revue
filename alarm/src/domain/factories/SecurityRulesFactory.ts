import { TimeSlot } from '../core/rules/TimeSlot.js'
import { IntrusionRule } from '../core/rules/IntrusionRule.js'
import { RangeRule } from '../core/rules/RangeRule.js'
import { SecurityRuleId } from '../core/rules/SecurityRuleId.js'
import { ObjectClass } from '../core/ObjectClass.js'
import { Contact } from 'common/dist/domain/core/Contact.js'
import { MeasureType } from 'common/dist/domain/core/MeasureType.js'

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
    id: SecurityRuleId,
    activeOn: string,
    creatorId: string,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    min: number,
    max: number,
    measure: MeasureType,
    enabled: boolean
  ): RangeRule {
    return {
      id,
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
    return {
      from,
      to
    }
  }
}

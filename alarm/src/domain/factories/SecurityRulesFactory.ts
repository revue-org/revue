import { TimeSlot } from '../core/rules/TimeSlot.js'
import { IntrusionRule } from '../core/rules/IntrusionRule.js'
import { RangeRule } from '../core/rules/RangeRule.js'
import { SecurityRuleId } from '../core/rules/SecurityRuleId.js'

export class SecurityRulesFactory {
  static createIntrusionRule(
    id: SecurityRuleId,
    activeOn: DeviceId,
    creatorId: UserId,
    objectClass: ObjectClass,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    enabled: boolean
  ): IntrusionRule {
    return {
      id,
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
    activeOn: DeviceId,
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
}

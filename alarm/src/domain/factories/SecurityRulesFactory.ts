import { TimeSlot } from '../core/rules/TimeSlot.js'
import { SecurityRule } from '../core/rules/SecurityRule.js'
import { IntrusionRule } from '../core/rules/IntrusionRule.js'
import { RangeRule } from '../core/rules/RangeRule.js'
import { SecurityRuleId } from '../core/rules/SecurityRuleId.js'

export interface SecurityRulesFactory {
  createIntrusionRule(
    id: SecurityRuleId,
    activeOn: DeviceId,
    creatorId: UserId,
    objectClass: ObjectClass,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    enabled: boolean
  ): IntrusionRule

  createRangeRule(
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
  ): RangeRule

}

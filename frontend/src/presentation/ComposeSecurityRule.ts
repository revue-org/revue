import type { IntrusionRule, RangeRule } from '@/domain/core/SecurityRule'

export function composeRangeRule(rangeRule: any): RangeRule {
  return {
    type: 'range',
    id: rangeRule.id.value,
    author: rangeRule.creatorId,
    activeOn: rangeRule.activeOn,
    description: rangeRule.description,
    contacts: rangeRule.contacts,
    enabled: rangeRule.enabled,
    validity: rangeRule.validity,
    min: rangeRule.data.min,
    max: rangeRule.data.max,
    measure: rangeRule.data.measure
  }
}

export function composeIntrusionRule(intrusionRule: any): IntrusionRule {
  return {
    type: 'intrusion',
    id: intrusionRule.id.value,
    activeOn: intrusionRule.activeOn,
    author: intrusionRule.creatorId,
    description: intrusionRule.description,
    contacts: intrusionRule.contacts,
    enabled: intrusionRule.enabled,
    validity: intrusionRule.validity,
    objectClass: intrusionRule.data.objectClass
  }
}

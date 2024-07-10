import type { IntrusionRule, RangeRule, TimeSlot } from '@/domain/core/SecurityRule'

export function composeRangeRule(rangeRule: any): RangeRule {
  return {
    type: 'range',
    id: rangeRule.id.value,
    author: rangeRule.creatorId,
    activeOn: rangeRule.activeOn,
    description: rangeRule.description,
    contacts: rangeRule.contacts,
    enabled: rangeRule.enabled,
    validity: composeValidity(rangeRule.validity),
    min: rangeRule.min,
    max: rangeRule.max,
    measure: rangeRule.measure
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
    validity: composeValidity(intrusionRule.validity),
    objectClass: intrusionRule.objectClass
  }
}

export function composeValidity(validity: any): TimeSlot {
  return {
    from: new Date(validity.from),
    to: new Date(validity.to)
  }
}

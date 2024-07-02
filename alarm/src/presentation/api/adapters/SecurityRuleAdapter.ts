import { intrusionRuleSchema, rangeRuleSchema } from '@/presentation/api/schemas/SecurityRuleSchema.js'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory.js'
import { IntrusionRule, RangeRule, TimeSlot } from '@/domain/core'
import { Contact, Measure } from 'common/dist/domain/core'

export class RangeRuleAdapter {
  static asDomainEvent(rangeRule: object): RangeRule {
    const rangeRuleMessage = rangeRuleSchema.parse(rangeRule)
    const contacts: Contact[] = rangeRuleMessage.contacts.map((contact: any) => {
      return {
        type: contact.type,
        value: contact.value
      }
    })
    const validity: TimeSlot = {
      from: new Date(rangeRuleMessage.validityStart),
      to: new Date(rangeRuleMessage.validityEnd)
    }
    const measure: Measure = {
      type: rangeRuleMessage.rule.measure.type,
      unit: rangeRuleMessage.rule.measure.unit
    }
    return SecurityRulesFactory.createRangeRule(
      rangeRuleMessage.activeOn,
      rangeRuleMessage.author,
      contacts,
      rangeRuleMessage.description,
      validity,
      rangeRuleMessage.rule.minValue,
      rangeRuleMessage.rule.maxValue,
      measure,
      true
    )
  }
}

export class IntrusionRuleAdapter {
  static asDomainEvent(intrusionRule: object): IntrusionRule {
    const intrusionRuleMessage = intrusionRuleSchema.parse(intrusionRule)
    const contacts: Contact[] = intrusionRuleMessage.contacts.map((contact: any) => {
      return {
        type: contact.contactType,
        value: contact.value
      }
    })
    const validity: TimeSlot = {
      from: new Date(intrusionRuleMessage.validityStart),
      to: new Date(intrusionRuleMessage.validityEnd)
    }
    return SecurityRulesFactory.createIntrusionRule(
      intrusionRuleMessage.activeOn,
      intrusionRuleMessage.author,
      intrusionRuleMessage.objectClass,
      contacts,
      intrusionRuleMessage.description,
      validity,
      true
    )
  }
}

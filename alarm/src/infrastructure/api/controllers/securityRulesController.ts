import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory.js'
import { Contact } from '@common/domain/core/Contact'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { Measure } from '@common/domain/core'
import { ObjectClass } from '@common/domain/core/ObjectClass.js'
import { alarmService } from '@/setup.js'

export const securityRuleController = {
  getSecurityRuleById: async (id: string): Promise<SecurityRule> => {
    return alarmService.getSecurityRuleById(SecurityRulesFactory.idOf(id))
  },

  getRangeRuleById: (id: string): Promise<RangeRule> => {
    return alarmService.getSecurityRuleById(SecurityRulesFactory.idOf(id)).then(rule => rule as RangeRule)
  },

  getIntrusionRuleById: (id: string): Promise<IntrusionRule> => {
    return alarmService.getSecurityRuleById(SecurityRulesFactory.idOf(id)).then(rule => rule as IntrusionRule)
  },

  getRangeRules: async (): Promise<RangeRule[]> => {
    return await alarmService.getRangeRules()
  },

  getIntrusionRules: async (): Promise<IntrusionRule[]> => {
    return await alarmService.getIntrusionRules()
  },

  createRangeRule: async (
    deviceId: string,
    creatorId: string,
    description: string,
    measure: Measure,
    minValue: number,
    maxValue: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await alarmService.createRangeRule(
      creatorId,
      deviceId,
      description,
      contacts,
      from,
      to,
      minValue,
      maxValue,
      measure
    )
  },

  createIntrusionRule: async (
    deviceId: string,
    creatorId: string,
    description: string,
    objectClass: ObjectClass,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await alarmService.createIntrusionRule(creatorId, deviceId, description, contacts, from, to, objectClass)
  },

  updateRangeRule: async (
    ruleId: string,
    description: string,
    min: number,
    max: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await alarmService.updateRangeRule(
      SecurityRulesFactory.idOf(ruleId),
      description,
      contacts,
      from,
      to,
      min,
      max
    )
  },

  updateIntrusionRule: async (
    ruleId: string,
    description: string,
    objectClass: string,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await alarmService.updateIntrusionRule(
      SecurityRulesFactory.idOf(ruleId),
      description,
      contacts,
      from,
      to,
      ObjectClass[objectClass as keyof typeof ObjectClass]
    )
  },

  deleteSecurityRule: async (id: string): Promise<void> => {
    await alarmService.deleteSecurityRule(SecurityRulesFactory.idOf(id))
  },

  getSecurityRuleContacts: async (id: string): Promise<Contact[]> => {
    return alarmService.getSecurityRuleContacts(SecurityRulesFactory.idOf(id))
  }
}

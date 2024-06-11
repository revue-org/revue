import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleService } from '@/application/services/SecurityRuleService'
import { SecurityRuleServiceImpl } from '@/application/services/SecurityRuleServiceImpl'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { MongoDBSecurityRuleRepository } from '@/infrastructure/storage/MongoDBSecurityRuleRepository'
import { ObjectClass } from '@/domain/core/ObjectClass'
import { Contact } from 'common/dist/domain/core/Contact.js'



const service: SecurityRuleService = new SecurityRuleServiceImpl(new MongoDBSecurityRuleRepository())
type MeasureType = {
  type: string,
  unit: string
}

export const securityRuleController = {
  getSecurityRuleById: async (id: string): Promise<SecurityRule> => {
    return await service.getSecurityRuleById(SecurityRulesFactory.idOf(id))
  },

  getRangeRules: async (): Promise<RangeRule[]> => {
    return await service.getRangeRules()
  },

  getIntrusionRules: async (): Promise<IntrusionRule[]> => {
    return await service.getIntrusionRules()
  },

  createRangeRule: async (
    deviceId: string,
    creatorId: string,
    description: string,
    measure: MeasureType,
    minValue: number,
    maxValue: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.createRangeRule(
      SecurityRulesFactory.createRangeRule(
        SecurityRulesFactory.newId(),
        deviceId,
        creatorId,
        contacts,
        description,
        SecurityRulesFactory.newTimeSlot(from, to),
        minValue,
        maxValue,
        measure,
        true
      )
    )
  },

  createIntrusionRule: async (
    deviceId: string,
    creatorId: string,
    description: string,
    objectClass: string,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.createIntrusionRule(
      SecurityRulesFactory.createIntrusionRule(
        SecurityRulesFactory.newId(),
        deviceId,
        creatorId,
        ObjectClass.PERSON,
        contacts,
        description,
        SecurityRulesFactory.newTimeSlot(from, to),
        true
      )
    )
  },

  updateRangeRule: async (
    ruleId: string,
    deviceId: string,
    description: string,
    measure: MeasureType,
    min: number,
    max: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.updateRangeRule(SecurityRulesFactory.createRangeRule(
      SecurityRulesFactory.idOf(ruleId),
      deviceId,
      "",
      contacts,
      description,
      SecurityRulesFactory.newTimeSlot(from, to),
      min,
      max,
      measure,
      true,
    ))
  },

  updateIntrusionRule: async (
    ruleId: string,
    deviceId: string,
    description: string,
    objectClass: string,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.updateIntrusionRule(SecurityRulesFactory.createIntrusionRule(
      SecurityRulesFactory.idOf(ruleId),
      deviceId,
      "",
      ObjectClass.PERSON,
      contacts,
      description,
      SecurityRulesFactory.newTimeSlot(from, to),
      true
    ))
  },

  deleteSecurityRule: async (id: string): Promise<void> => {
    return service.deleteSecurityRule(SecurityRulesFactory.idOf(id))
  }
}

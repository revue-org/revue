import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { AlarmService } from '@/application/services/AlarmService'
import { AlarmServiceImpl } from '@/application/services/AlarmServiceImpl'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory'
import { MongoDBSecurityRuleRepository } from '@/infrastructure/storage/MongoDBSecurityRuleRepository'
import { Contact } from '@common/domain/core/Contact'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { ObjectClass } from '@/domain/core/ObjectClass'

const service: AlarmService = new AlarmServiceImpl(new MongoDBSecurityRuleRepository())
type MeasureType = {
  type: string
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
    await service.createRangeRule(
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
    objectClass: string,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await service.createIntrusionRule(
      creatorId,
      deviceId,
      description,
      contacts,
      from,
      to,
      ObjectClass.PERSON
    )
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
    await service.updateRangeRule(
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
    await service.updateIntrusionRule(
      SecurityRulesFactory.idOf(ruleId),
      description,
      contacts,
      from,
      to,
      ObjectClass.PERSON
    )
  },

  deleteSecurityRule: async (id: string): Promise<void> => {
    await service.deleteSecurityRule(SecurityRulesFactory.idOf(id))
  }
}

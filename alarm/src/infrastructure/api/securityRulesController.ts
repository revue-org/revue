import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { Contact } from '@domain/monitoring/core/Contact.js'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleService } from '@/application/services/SecurityRuleService'
import { SecurityRuleServiceImpl } from '@/application/services/SecurityRuleServiceImpl'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'

const service: SecurityRuleService = new SecurityRuleServiceImpl(new SecurityRuleRepositoryImpl())

export const securityRuleController = {
  getSecurityRuleById: async (id: string): Promise<SecurityRule> => {
    return await service.getSecurityRuleById(id)
  },

  getRangeRules: async (): Promise<RangeRule[]> => {
    return await service.getRangeRules()
  },

  getIntrusionRules: async (): Promise<IntrusionRule[]> => {
    return await service.getIntrusionRules()
  },

  createRangeRule: async (
    deviceId: DeviceId,
    creatorId: string,
    description: string,
    measure: Measure,
    minValue: number,
    maxValue: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.createRangeRule(
      SecurityRulesFactory.createRangeRule(
        new SecurityRuleId(),
        deviceId,
        creatorId,
        contacts,
        description,
        new TimeSlot(from, to),
        minValue,
        maxValue,
        measure,
        true
      )
    )
  },

  createIntrusionRule: async (
    deviceId: DeviceId,
    creatorId: string,
    description: string,
    objectClass: ObjectClass,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.createIntrusionRule(
      SecurityRulesFactory.createIntrusionRule(
        new SecurityRuleId(),
        deviceId,
        creatorId,
        objectClass,
        contacts,
        description,
        new TimeSlot(from, to),
        true
      )
    )
  },

  updateRangeRule: async (
    exceedingRuleId: string,
    deviceId: DeviceId,
    description: string,
    measure: Measure,
    minValue: number,
    maxValue: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.updateRangeRule(SecurityRulesFactory.createRangeRule())
  },

  updateIntrusionRule: async (
    intrusionRuleId: string,
    deviceId: DeviceId,
    description: string,
    objectClass: ObjectClass,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    service.updateIntrusionRule(SecurityRulesFactory.createIntrusionRule())
  },

  deleteSecurityRule: async (id: string): Promise<void> => {
    return service.deleteSecurityRule(id)
  }
}

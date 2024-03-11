import { SecurityRuleFactory } from '@domain/alarm-system/factories/SecurityRuleFactory.js'
import { SecurityRuleFactoryImpl } from '@domain/alarm-system/factories/impl/SecurityRuleFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { ObjectClass } from '@domain/alarm-system/core/impl/enum/ObjectClass.js'
import { ExceedingRule } from '@domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from '@domain/alarm-system/core/IntrusionRule.js'
import { SecurityRule } from '@domain/alarm-system/core/SecurityRule.js'
import { Contact } from '@domain/monitoring/core/Contact.js'
import { securityRuleService } from '../init.js'

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
export const securityRuleController = {
  getSecurityRuleById: async (id: string): Promise<SecurityRule> => {
    return await securityRuleService.getSecurityRuleById(id)
  },
  getExceedingRules: async (): Promise<ExceedingRule[]> => {
    return await securityRuleService.getExceedingRules()
  },
  getIntrusionRules: async (): Promise<IntrusionRule[]> => {
    return await securityRuleService.getIntrusionRules()
  },
  createExceedingRule: async (
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
    securityRuleService.insertExceedingSecurityRule(
      securityRuleFactory.createExceedingRule(
        minValue,
        maxValue,
        measure,
        '',
        deviceId,
        creatorId,
        contacts,
        description,
        from,
        to
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
    securityRuleService.insertIntrusionSecurityRule(
      securityRuleFactory.createIntrusionRule(
        objectClass,
        '',
        deviceId,
        creatorId,
        contacts,
        description,
        from,
        to
      )
    )
  },
  updateExceedingRule: async (
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
    securityRuleService.updateExceedingSecurityRule(
      securityRuleFactory.createExceedingRule(
        minValue,
        maxValue,
        measure,
        exceedingRuleId,
        deviceId,
        '',
        contacts,
        description,
        from,
        to
      )
    )
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
    securityRuleService.updateIntrusionSecurityRule(
      securityRuleFactory.createIntrusionRule(
        objectClass,
        intrusionRuleId,
        deviceId,
        '',
        contacts,
        description,
        from,
        to
      )
    )
  },
  deleteExceedingRule: async (id: string): Promise<void> => {
    return securityRuleService.deleteExceedingRule(id)
  },
  deleteIntrusionRule: async (id: string): Promise<void> => {
    return securityRuleService.deleteIntrusionRule(id)
  }
}

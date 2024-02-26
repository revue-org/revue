import { Model, model } from 'mongoose'
import { SecurityRuleRepository } from '@domain/security-rule/repositories/SecurityRuleRepository.js'
import { SecurityRuleRepositoryImpl } from '@storage/security-rule/SecurityRuleRepositoryImpl.js'
import { SecurityRuleFactory } from '@domain/security-rule/factories/SecurityRuleFactory.js'
import { SecurityRuleFactoryImpl } from '@domain/security-rule/factories/impl/SecurityRuleFactoryImpl.js'
import { exceedingRuleSchema } from '@storage/security-rule/schemas/ExceedingRuleSchema.js'
import { intrusionRuleSchema } from '@storage/security-rule/schemas/IntrusionRuleSchema.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { ObjectClass } from '@domain/security-rule/core/impl/enum/ObjectClass.js'
import { ExceedingRule } from '@domain/security-rule/core/ExceedingRule.js'
import { IntrusionRule } from '@domain/security-rule/core/IntrusionRule.js'
import { SecurityRule } from '@domain/security-rule/core/SecurityRule.js'
import { Contact } from '@domain/monitoring/core/Contact.js'

export const exceedingRuleModel: Model<ExceedingRule> = model<ExceedingRule>(
  'ExceedingRule',
  exceedingRuleSchema,
  'securityRule'
)
export const intrusionRuleModel: Model<IntrusionRule> = model<IntrusionRule>(
  'IntrusionRule',
  intrusionRuleSchema,
  'securityRule'
)

export const securityRuleRepository: SecurityRuleRepository = new SecurityRuleRepositoryImpl(
  exceedingRuleModel,
  intrusionRuleModel
)
const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
export const securityRuleController = {
  getSecurityRuleById: async (id: string): Promise<SecurityRule> => {
    return await securityRuleRepository.getSecurityRuleById(id)
  },
  getExceedingRules: async (): Promise<ExceedingRule[]> => {
    return await securityRuleRepository.getExceedingRules()
  },
  getIntrusionRules: async (): Promise<IntrusionRule[]> => {
    return await securityRuleRepository.getIntrusionRules()
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
    await securityRuleRepository.insertExceedingSecurityRule(
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
    await securityRuleRepository.insertIntrusionSecurityRule(
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
    await securityRuleRepository.updateExceedingSecurityRule(
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
    await securityRuleRepository.updateIntrusionSecurityRule(
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
    return await securityRuleRepository.deleteExceedingRule(id)
  },
  deleteIntrusionRule: async (id: string): Promise<void> => {
    return await securityRuleRepository.deleteIntrusionRule(id)
  }
}

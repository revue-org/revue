import { Model, model } from 'mongoose'
import { SecurityRuleRepository } from '@domain/security-rule/repositories/SecurityRuleRepository.js'
import { SecurityRuleRepositoryImpl } from '@storage/security-rule/SecurityRuleRepositoryImpl.js'
import { SecurityRuleFactory } from '@domain/security-rule/factories/SecurityRuleFactory.js'
import { SecurityRuleFactoryImpl } from '@domain/security-rule/factories/impl/SecurityRuleFactoryImpl.js'
import { exceedingRuleSchema } from '@storage/security-rule/schemas/ExceedingRule.js'
import { intrusionSchema } from 'domain/dist/storage/anomaly/schemas/IntrusionSchema'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { ObjectClass } from '@domain/security-rule/core/impl/enum/ObjectClass.js'
import { ExceedingRule } from '@domain/security-rule/core/ExceedingRule.js'
import { IntrusionRule } from '@domain/security-rule/core/IntrusionRule.js'
import { SecurityRule } from '@domain/security-rule/core/SecurityRule.js'
import { Contact } from '@domain/monitoring/core/Contact'

const exceedingRuleModel: Model<ExceedingRule> = model<ExceedingRule>(
  'ExceedingRule',
  exceedingRuleSchema,
  'securityRule'
)
const intrusionRuleModel: Model<IntrusionRule> = model<IntrusionRule>(
  'IntrusionRule',
  intrusionSchema,
  'securityRule'
)

const securityRuleManager: SecurityRuleRepository = new SecurityRuleRepositoryImpl(
  exceedingRuleModel,
  intrusionRuleModel
)
const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
export const securityRuleController = {
  getSecurityRuleById: async (id: string): Promise<SecurityRule> => {
    return await securityRuleManager.getSecurityRuleById(id)
  },
  getExceedingRules: async (): Promise<ExceedingRule[]> => {
    return await securityRuleManager.getExceedingRules()
  },
  getIntrusionRules: async (): Promise<IntrusionRule[]> => {
    return await securityRuleManager.getIntrusionRules()
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
    await securityRuleManager.insertExceedingSecurityRule(
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
    intrusionObject: ObjectClass,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await securityRuleManager.insertIntrusionSecurityRule(
      securityRuleFactory.createIntrusionRule(
        intrusionObject,
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
    await securityRuleManager.updateExceedingSecurityRule(
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
    intrusionObject: ObjectClass,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await securityRuleManager.updateIntrusionSecurityRule(
      securityRuleFactory.createIntrusionRule(
        intrusionObject,
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
  deleteSecurityRule: async (id: string): Promise<void> => {
    return await securityRuleManager.deleteSecurityRule(id)
  }
}

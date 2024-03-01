import { AnomalyService } from 'domain/dist/domain/alarm-system/AnomalyService.js'
import { AnomalyServiceImpl } from 'domain/src/application/alarm-system/impl/AnomalyServiceImpl.js'
import { model, Model } from 'mongoose'
import { Exceeding, Intrusion } from 'domain/dist/domain/anomaly/core'
import { exceedingSchema } from 'domain/dist/storage/anomaly/schemas/ExceedingSchema'
import { intrusionSchema } from 'domain/dist/storage/anomaly/schemas/IntrusionSchema'
import { ExceedingRule, IntrusionRule } from 'domain/dist/domain/security-rule/core'
import { exceedingRuleSchema } from 'domain/dist/storage/security-rule/schemas/ExceedingRuleSchema'
import { intrusionRuleSchema } from 'domain/dist/storage/security-rule/schemas/IntrusionRuleSchema'
import { SecurityRuleRepository } from 'domain/dist/domain/security-rule/repositories/SecurityRuleRepository'
import { SecurityRuleRepositoryImpl } from 'domain/dist/storage/security-rule/SecurityRuleRepositoryImpl'

export const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
export const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

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

const alarmService: AlarmService = new AlarmServiceImpl()
export default alarmService

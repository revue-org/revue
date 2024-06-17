import { model, Model } from 'mongoose'
import { Intrusion } from '@common/domain/core/Intrusion'
import { Outlier } from '@common/domain/core/Outlier'
import { SecurityRulesRepository } from './application/repositories/SecurityRulesRepository'
import { AlarmService } from './application/services/AlarmService'
import { AlarmServiceImpl } from './application/services/impl/AlarmServiceImpl'
import { securityRuleSchema } from '@/infrastructure/storage/schemas/SecurityRuleSchema'

export const outlierModel: Model<Outlier> = model<Outlier>('Outlier', outlierSchema, 'anomaly')
export const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

export const securityRuleModel: Model<SecurityRule> = model<SecurityRule>(
  'SecurityRule',
  securityRuleSchema,
  'securityRule'
)

const securityRuleRepository: SecurityRuleRepository = new SecurityRuleRepositoryImpl(
  outlierRuleModel,
  intrusionRuleModel
)

export const alarmService: AlarmService = new AlarmServiceImpl(securityRuleRepository)

import { model, Model } from 'mongoose'
import { Exceeding } from 'domain/dist/domain/alarm-system/core/Exceeding.js'
import { Intrusion } from 'domain/dist/domain/alarm-system/core/Intrusion.js'
import { exceedingSchema } from 'domain/dist/storage/alarm-system/schemas/ExceedingSchema.js'
import { intrusionSchema } from 'domain/dist/storage/alarm-system/schemas/IntrusionSchema.js'
import { ExceedingRule } from 'domain/dist/domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from 'domain/dist/domain/alarm-system/core/IntrusionRule.js'
import { exceedingRuleSchema } from 'domain/dist/storage/alarm-system/schemas/ExceedingRuleSchema.js'
import { intrusionRuleSchema } from 'domain/dist/storage/alarm-system/schemas/IntrusionRuleSchema.js'
import { RecognizingNode } from 'domain/dist/domain/alarm-system/core/RecognizingNode.js'
import { recognizingNodeSchema } from 'domain/dist/storage/alarm-system/schemas/RecognizingNodeSchema.js'
import { AnomalyService } from 'domain/dist/application/alarm-system/AnomalyService.js'
import { AnomalyServiceImpl } from 'domain/dist/application/alarm-system/impl/AnomalyServiceImpl.js'
import { SecurityRuleService } from 'domain/dist/application/alarm-system/SecurityRuleService.js'
import { SecurityRuleServiceImpl } from 'domain/dist/application/alarm-system/impl/SecurityRuleServiceImpl.js'
import { RecognizingNodeService } from 'domain/dist/application/alarm-system/RecognizingNodeService.js'
import { RecognizingNodeServiceImpl } from 'domain/dist/application/alarm-system/impl/RecognizingNodeServiceImpl.js'
import { SecurityRuleRepository } from 'domain/dist/domain/alarm-system/repositories/SecurityRuleRepository.js'
import { SecurityRuleRepositoryImpl } from 'domain/dist/storage/alarm-system/SecurityRuleRepositoryImpl.js'
import { RecognizingNodeRepository } from 'domain/dist/domain/alarm-system/repositories/RecognizingNodeRepository.js'
import { RecognizingNodeRepositoryImpl } from 'domain/dist/storage/alarm-system/RecognizingNodeRepositoryImpl.js'
import { AnomalyRepository } from 'domain/dist/domain/alarm-system/repositories/AnomalyRepository.js'
import { AnomalyRepositoryImpl } from 'domain/dist/storage/alarm-system/AnomalyRepositoryImpl.js'

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

export const recognizingNodeModel: Model<RecognizingNode> = model<RecognizingNode>(
  'RecognizingNode',
  recognizingNodeSchema,
  'recognizingNode'
)

const anomalyRepository: AnomalyRepository = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)

export const anomalyService: AnomalyService = new AnomalyServiceImpl(anomalyRepository)

const securityRuleRepository: SecurityRuleRepository = new SecurityRuleRepositoryImpl(
  exceedingRuleModel,
  intrusionRuleModel
)

export const securityRuleService: SecurityRuleService = new SecurityRuleServiceImpl(securityRuleRepository)

const recognizingNodeRepository: RecognizingNodeRepository = new RecognizingNodeRepositoryImpl(
  recognizingNodeModel
)

export const recognizingNodeService: RecognizingNodeService = new RecognizingNodeServiceImpl(
  recognizingNodeRepository
)

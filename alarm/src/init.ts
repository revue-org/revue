import { AlarmService } from 'domain/dist/application/alarm-system/AlarmService'
import { AlarmServiceImpl } from 'domain/dist/application/alarm-system/impl/AlarmServiceImpl'
import { model, Model } from 'mongoose'
import { Exceeding, Intrusion } from 'domain/dist/domain/anomaly/core'
import { exceedingSchema } from 'domain/dist/storage/anomaly/schemas/ExceedingSchema'
import { intrusionSchema } from 'domain/dist/storage/anomaly/schemas/IntrusionSchema'
import { AnomalyRepository } from 'domain/dist/domain/anomaly/repositories/AnomalyRepository'
import { AnomalyRepositoryImpl } from 'domain/dist/storage/anomaly/AnomalyRepositoryImpl'
import { Notification, RecognizingNode } from 'domain/dist/domain/alarm-system/core'
import { notificationSchema } from 'domain/dist/storage/alarm-system/schemas/NotificationSchema'
import { NotificationRepository } from 'domain/dist/domain/alarm-system/repositories/NotificationRepository'
import { NotificationRepositoryImpl } from 'domain/dist/storage/alarm-system/NotificationRepositoryImpl'
import { recognizingNodeSchema } from 'domain/dist/storage/alarm-system/schemas/RecognizingNodeSchema'
import { RecognizingNodeRepository } from 'domain/dist/domain/alarm-system/repositories/RecognizingNodeRepository'
import { RecognizingNodeRepositoryImpl } from 'domain/dist/storage/alarm-system/RecognizingNodeRepositoryImpl'
import { ExceedingRule, IntrusionRule } from 'domain/dist/domain/security-rule/core'
import { exceedingRuleSchema } from 'domain/dist/storage/security-rule/schemas/ExceedingRuleSchema'
import { intrusionRuleSchema } from 'domain/dist/storage/security-rule/schemas/IntrusionRuleSchema'
import { SecurityRuleRepository } from 'domain/dist/domain/security-rule/repositories/SecurityRuleRepository'
import { SecurityRuleRepositoryImpl } from 'domain/dist/storage/security-rule/SecurityRuleRepositoryImpl'

export const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
export const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

export const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
)

export const recognizingNodeModel: Model<RecognizingNode> = model<RecognizingNode>(
  'RecognizingNode',
  recognizingNodeSchema,
  'recognizingNode'
)
const recognizingNodeRepository: RecognizingNodeRepository = new RecognizingNodeRepositoryImpl(
  recognizingNodeModel
)

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

const notificationRepository: NotificationRepository = new NotificationRepositoryImpl(notificationModel)

const anomalyRepository: AnomalyRepository = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)

const alarmService: AlarmService = new AlarmServiceImpl()
export default alarmService

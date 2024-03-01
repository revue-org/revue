import { AlarmService } from 'domain/dist/application/alarm-system/AnomalyService'
import { AlarmServiceImpl } from 'domain/dist/application/alarm-system/impl/AnomalyServiceImpl'
import { model, Model } from 'mongoose'
import { Exceeding, Intrusion } from 'domain/dist/domain/anomaly/core'
import { exceedingSchema } from 'domain/dist/storage/anomaly/schemas/ExceedingSchema'
import { intrusionSchema } from 'domain/dist/storage/anomaly/schemas/IntrusionSchema'
import { AnomalyRepository } from 'domain/dist/domain/anomaly/repositories/AnomalyRepository'
import { AnomalyRepositoryImpl } from 'domain/dist/storage/anomaly/AnomalyRepositoryImpl'
import { Notification, RecognizingNode } from 'domain/dist/domain/alarm-system/core'
import { notificationSchema } from 'domain/dist/storage/alarm-system/schemas/NotificationSchema'
import { NotificationRepository } from 'domain/dist/domain/alarm-system/repositories/NotificationRepository'
import { NotificationRepositoryImpl } from '../../domain/src/storage/notification/NotificationRepositoryImpl'
import { recognizingNodeSchema } from 'domain/dist/storage/alarm-system/schemas/RecognizingNodeSchema'
import { RecognizingNodeRepository } from 'domain/dist/domain/alarm-system/repositories/RecognizingNodeRepository'
import { RecognizingNodeRepositoryImpl } from 'domain/dist/storage/alarm-system/RecognizingNodeRepositoryImpl'
import { ExceedingRule, IntrusionRule } from 'domain/dist/domain/security-rule/core'
import { exceedingRuleSchema } from 'domain/dist/storage/security-rule/schemas/ExceedingRuleSchema'
import { intrusionRuleSchema } from 'domain/dist/storage/security-rule/schemas/IntrusionRuleSchema'
import { SecurityRuleRepository } from 'domain/dist/domain/security-rule/repositories/SecurityRuleRepository'
import { SecurityRuleRepositoryImpl } from 'domain/dist/storage/security-rule/SecurityRuleRepositoryImpl'

export const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
)

const notificationService: NotificationService = new NotificationServiceImpl(notificationModel)
export default notificationService

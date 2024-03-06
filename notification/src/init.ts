import { model, Model } from 'mongoose'
import { Notification } from 'domain/dist/domain/notification/core/Notification.js'
import { notificationSchema } from 'domain/dist/storage/notification/schemas/NotificationSchema.js'
import { exceedingRuleSchema } from 'domain/dist/storage/alarm-system/schemas/ExceedingRuleSchema.js'
import { intrusionRuleSchema } from 'domain/dist/storage/alarm-system/schemas/IntrusionRuleSchema.js'
import { NotificationService } from 'domain/dist/application/notification/NotificationService.js'
import { NotificationServiceImpl } from 'domain/dist/application/notification/impl/NotificationServiceImpl.js'
import { SecurityRuleService } from 'domain/dist/application/alarm-system/SecurityRuleService.js'
import { SecurityRuleServiceImpl } from 'domain/dist/application/alarm-system/impl/SecurityRuleServiceImpl.js'
import { ExceedingRule } from 'domain/dist/domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from 'domain/dist/domain/alarm-system/core/IntrusionRule.js'

export const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
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

export const notificationService: NotificationService = new NotificationServiceImpl(notificationModel)

export const securityRuleService: SecurityRuleService = new SecurityRuleServiceImpl(
  exceedingRuleModel,
  intrusionRuleModel
)

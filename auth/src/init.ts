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
import { User } from "domain/dist/domain/monitoring/core";
import { userSchema } from "domain/dist/storage/monitoring/schemas/UserSchema";
import { UserRepository } from "domain/dist/domain/monitoring/repositories/UserRepository";
import { UserRepositoryImpl } from "domain/dist/storage/monitoring/UserRepositoryImpl";

export const userModel: Model<User> = model<User>('User', userSchema, 'user')

const userRepository: UserRepository = new UserRepositoryImpl(userModel)

export const userService: AnomalyService = new AnomalyServiceImpl(anomalyRepository)

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

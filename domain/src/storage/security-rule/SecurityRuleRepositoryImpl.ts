import { SecurityRuleRepository } from '../../domain/security-rule/repositories/SecurityRuleRepository.js'
import { SecurityRule } from '../../domain/security-rule/core/SecurityRule.js'
import { Model, Promise } from 'mongoose'
import { ExceedingRule } from '../../domain/security-rule/core/ExceedingRule'
import { IntrusionRule } from '../../domain/security-rule/core/IntrusionRule'
import { ExceedingRuleImpl } from '../../domain/security-rule/core/impl/ExceedingRuleImpl'
import { IntrusionRuleImpl } from '../../domain/security-rule/core/impl/IntrusionRuleImpl'

class SecurityRuleRepositoryImpl implements SecurityRuleRepository {
  exceedingRuleModel: Model<ExceedingRule>
  intrusionRuleModel: Model<IntrusionRule>

  constructor(exceedingRuleModel: Model<ExceedingRule>, intrusionRuleModel: Model<IntrusionRule>) {
    this.exceedingRuleModel = exceedingRuleModel
    this.intrusionRuleModel = intrusionRuleModel
  }

  async getExceedingRules(): Promise<Array<ExceedingRule>> {
    return this.exceedingRuleModel.find()
  }

  async getIntrusionRules(): Promise<Array<IntrusionRule>> {
    return this.intrusionRuleModel.find()
  }

  async getSecurityRule(securityRuleId: string): Promise<ExceedingRule | IntrusionRule> {
    const exceedingRule = await this.exceedingRuleModel.findById(securityRuleId)
    if (exceedingRule) {
      return exceedingRule
    }
    const intrusionRule = await this.intrusionRuleModel.findById(securityRuleId)
    if (intrusionRule) {
      return intrusionRule
    }
    throw new Error('Security rule not found')
  }

  async insertSecurityRule(securityRule: SecurityRule): Promise<void> {
    switch (typeof securityRule) {
      case typeof ExceedingRuleImpl:
        await this.exceedingRuleModel.create({
          _id: securityRule.securityRuleId,
          deviceId: {
            type: securityRule.deviceId.type,
            code: securityRule.deviceId.code
          },
          creatorId: securityRule.creatorId,
          contactsToNotify: securityRule.contactsToNotify,
          description: securityRule.description,
          from: securityRule.from,
          to: securityRule.to,
          measure: (securityRule as ExceedingRule).measure
        })
        break
      case typeof IntrusionRuleImpl:
        await this.intrusionRuleModel.create({
          _id: securityRule.securityRuleId,
          deviceId: {
            type: securityRule.deviceId.type,
            code: securityRule.deviceId.code
          },
          creatorId: securityRule.creatorId,
          contactsToNotify: securityRule.contactsToNotify,
          description: securityRule.description,
          from: securityRule.from,
          to: securityRule.to
        })
        break
    }
  }

  async updateSecurityRule(securityRule: SecurityRule): Promise<void> {
    switch (typeof securityRule) {
      case typeof ExceedingRuleImpl:
        await this.exceedingRuleModel.findByIdAndUpdate(securityRule.securityRuleId, {
          deviceId: {
            type: securityRule.deviceId.type,
            code: securityRule.deviceId.code
          },
          creatorId: securityRule.creatorId,
          contactsToNotify: securityRule.contactsToNotify,
          description: securityRule.description,
          from: securityRule.from,
          to: securityRule.to,
          measure: (securityRule as ExceedingRule).measure
        })
        break
      case typeof IntrusionRuleImpl:
        await this.intrusionRuleModel.findByIdAndUpdate(securityRule.securityRuleId, {
          deviceId: {
            type: securityRule.deviceId.type,
            code: securityRule.deviceId.code
          },
          creatorId: securityRule.creatorId,
          contactsToNotify: securityRule.contactsToNotify,
          description: securityRule.description,
          from: securityRule.from,
          to: securityRule.to
        })
        break
    }
  }

  async deleteSecurityRule(securityRuleId: string): Promise<void> {
    //TODO: to check anomaly: if the merged schema works well, it is not necessary to delete exceedings OR intrusions
    //TODO: but we can use the merger schema to delete all the anomalies by only securityRuleId
    throw new Error('Method not implemented.')
  }
}

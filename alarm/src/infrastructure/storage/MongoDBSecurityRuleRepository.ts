import mongoose from 'mongoose'
import { SecurityRuleRepository } from '@/application/repositories/SecurityRuleRepository.js'
import { RangeRule } from '@/domain/core/rules/RangeRule.js'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule.js'
import { securityRuleSchema } from './schemas/SecurityRuleSchema'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import {
  SecurityRuleDBAdapter,
  SecurityRuleDBEntity
} from '@/infrastructure/storage/models/SecurityRuleModel'

export class MongoDBSecurityRuleRepository implements SecurityRuleRepository {
  private _model = mongoose.model<SecurityRuleDBEntity>('SecurityRuleSchema', securityRuleSchema)

  async getRangeRules(): Promise<RangeRule[]> {
    const rules = await this._model
      .find({
        type: 'range'
      })
      .lean()
    return rules.map(rule => SecurityRuleDBAdapter.asDomainEntity(rule) as RangeRule)
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    const rules = await this._model
      .find({
        type: 'intrusion'
      })
      .lean()
    return rules.map(rule => SecurityRuleDBAdapter.asDomainEntity(rule) as IntrusionRule)
  }

  async getSecurityRuleById(securityRuleId: SecurityRuleId): Promise<SecurityRule> {
    const rule = await this._model
      .findOne({
        id: securityRuleId.id
      })
      .lean()
    if (!rule) {
      throw new Error('Security rule not found')
    }
    return SecurityRuleDBAdapter.asDomainEntity(rule)
  }

  async getSecurityRules(): Promise<SecurityRule[]> {
    return this._model
      .find()
      .lean()
      .then(rules => {
        return rules.map(rule => SecurityRuleDBAdapter.asDomainEntity(rule))
      })
  }

  async saveSecurityRule(securityRule: SecurityRule): Promise<void> {
    await this._model.create(SecurityRuleDBAdapter.asDBEntity(securityRule))
  }

  async updateSecurityRule(securityRule: SecurityRule): Promise<void> {
    await this._model.findOneAndUpdate(
      { id: securityRule.id.id },
      SecurityRuleDBAdapter.asDBEntity(securityRule)
    )
  }

  async enableSecurityRule(securityRuleId: SecurityRuleId): Promise<void> {
    await this._model.findOneAndUpdate({ id: securityRuleId.id }, { enabled: true })
  }

  async disableSecurityRule(securityRuleId: SecurityRuleId): Promise<void> {
    await this._model.findOneAndUpdate({ id: securityRuleId.id }, { enabled: false })
  }

  async removeSecurityRule(securityRuleId: SecurityRuleId): Promise<void> {
    await this._model.deleteOne({ id: securityRuleId.id })
  }
}

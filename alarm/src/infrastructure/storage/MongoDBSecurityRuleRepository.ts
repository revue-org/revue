import mongoose, { Model } from 'mongoose'
import { SecurityRulesRepository } from '@/application/repositories/SecurityRulesRepository.js'
import { RangeRule } from '@/domain/core/rules/RangeRule.js'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule.js'
import { securityRuleSchema } from './SecurityRuleSchema'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'


export class MongoDBSecurityRuleRepository implements SecurityRulesRepository {
  private _model = mongoose.model('SecurityRuleSchema', securityRuleSchema);

  async getRangeRules(): Promise<RangeRule[]> {
    return this._model
      .find({
        'type': 'range'
      })
      .lean()
      .then(rules => {
        return rules.map(rule => {
          return SecurityRulesFactory.createRangeRule(
            SecurityRulesFactory.idOf(rule.id),
            rule.activeOn,
            rule.creatorId,
            rule.contacts,
            rule.description,
            TimeSlotFactory.create(rule.validity),
            rule.data.min,
            rule.data.max,
            rule.data.measure,
            rule.enabled)
        })
      })
  }

  async getIntrusionRules(): Promise<InstrusionRule[]> {
    return this._model
      .find({
        'type': 'range'
      })
      .lean()
      .then(rules => {
        return rules.map(rule => {
          const contacts: Contact[] = [];
          rule.contacts.forEach(contact => contacts.push(contact));
          return SecurityRulesFactory.createIntrusionRule(
            SecurityRulesFactory.idOf(rule.id),
            rule.activeOn,
            rule.creatorId,
            rule.data.objectClass,
            contacts,
            rule.description,
            TimeSlotFactory.create(rule.validity),
            rule.enabled
          )
        })
      })
  }



  async getSecurityRuleById(securityRuleId: SecurityRuleId): Promise<SecurityRule> {
    const rule = await this._model.findOne({
      id: securityRuleId.id
    })
    if (!rule) {
      throw new Error('Security rule not found')
    }
    const contacts: Contact[] = [];
    rule.contacts.forEach(contact => contacts.push(contact));
    if (rule.type == 'range') {
      return SecurityRulesFactory.createRangeRule(
        SecurityRulesFactory.idOf(rule.id),
        rule.activeOn,
        rule.creatorId,
        contacts,
        rule.description,
        TimeSlotFactory.create(rule.validity),
        rule.data.min,
        rule.data.max,
        rule.data.measure,
        rule.enabled
      )
    } else {
      return SecurityRulesFactory.createIntrusionRule(
        SecurityRulesFactory.idOf(rule.id),
        rule.activeOn,
        rule.creatorId,
        rule.data.objectClass,
        contacts,
        rule.description,
        TimeSlotFactory.create(rule.validity),
        rule.enabled
      )
    }
  }

  async insertExceedingSecurityRule(exceedingRule: RangeRule): Promise<string> {
    return await this.exceedingRuleModel
      .create({
        deviceId: {
          type: DeviceTypeConverter.convertToString(exceedingRule.deviceId.type),
          code: exceedingRule.deviceId.code
        },
        creatorId: exceedingRule.creatorId,
        contactsToNotify: exceedingRule.contactsToNotify,
        description: exceedingRule.description,
        min: exceedingRule.min,
        max: exceedingRule.max,
        from: exceedingRule.from,
        to: exceedingRule.to,
        measure: MeasureConverter.convertToString(exceedingRule.measure)
      })
      .then((exceedingRule): string => {
        return exceedingRule._id.toString()
      })
      .catch((err): string => {
        throw err
      })
  }

  async insertIntrusionSecurityRule(intrusionRule: IntrusionRule): Promise<string> {
    return await this.intrusionRuleModel
      .create({
        deviceId: {
          type: DeviceTypeConverter.convertToString(intrusionRule.deviceId.type),
          code: intrusionRule.deviceId.code
        },
        creatorId: intrusionRule.creatorId,
        contactsToNotify: intrusionRule.contactsToNotify,
        description: intrusionRule.description,
        objectClass: ObjectClassConverter.convertToString(intrusionRule.objectClass),
        from: intrusionRule.from,
        to: intrusionRule.to
      })
      .then((intrusionRule): string => {
        return intrusionRule._id.toString()
      })
      .catch((err): string => {
        throw err
      })
  }

  async updateExceedingSecurityRule(exceedingRule: RangeRule): Promise<void> {
    await this.exceedingRuleModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(exceedingRule.securityRuleId),
      {
        deviceId: {
          type: DeviceTypeConverter.convertToString(exceedingRule.deviceId.type),
          code: exceedingRule.deviceId.code
        },
        contactsToNotify: exceedingRule.contactsToNotify,
        description: exceedingRule.description,
        min: exceedingRule.min,
        max: exceedingRule.max,
        from: exceedingRule.from,
        to: exceedingRule.to,
        measure: MeasureConverter.convertToString(exceedingRule.measure)
      }
    )
  }

  async updateIntrusionSecurityRule(intrusionRule: IntrusionRule): Promise<void> {
    await this.intrusionRuleModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(intrusionRule.securityRuleId),
      {
        deviceId: {
          type: DeviceTypeConverter.convertToString(intrusionRule.deviceId.type),
          code: intrusionRule.deviceId.code
        },
        contactsToNotify: intrusionRule.contactsToNotify,
        description: intrusionRule.description,
        objectClass: ObjectClassConverter.convertToString(intrusionRule.objectClass),
        from: intrusionRule.from,
        to: intrusionRule.to
      }
    )
  }

  async deleteRangeRule(exceedingRuleId: string): Promise<void> {
    await this.exceedingRuleModel.deleteOne({
      _id: new mongoose.Types.ObjectId(exceedingRuleId)
    })
  }

  async deleteIntrusionRule(intrusionRuleId: string): Promise<void> {
    await this.intrusionRuleModel.deleteOne({
      _id: new mongoose.Types.ObjectId(intrusionRuleId)
    })
  }
}

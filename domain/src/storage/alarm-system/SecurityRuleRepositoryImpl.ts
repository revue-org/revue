import { SecurityRuleRepository } from '../../domain/alarm-system/repositories/SecurityRuleRepository.js'
import { SecurityRule } from '../../domain/alarm-system/core/SecurityRule.js'
import mongoose, { Model } from 'mongoose'
import { ExceedingRule } from '../../domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from '../../domain/alarm-system/core/IntrusionRule.js'
import { DeviceTypeConverter } from '../../utils/DeviceTypeConverter.js'
import { MeasureConverter } from '../../utils/MeasureConverter.js'
import { ObjectClassConverter } from '../../utils/ObjectClassConverter.js'
import { ContactTypeConverter } from '../../utils/ContactTypeConverter.js'

export class SecurityRuleRepositoryImpl implements SecurityRuleRepository {
  exceedingRuleModel: Model<ExceedingRule>
  intrusionRuleModel: Model<IntrusionRule>

  constructor(exceedingRuleModel: Model<ExceedingRule>, intrusionRuleModel: Model<IntrusionRule>) {
    this.exceedingRuleModel = exceedingRuleModel
    this.intrusionRuleModel = intrusionRuleModel
  }

  async getExceedingRules(): Promise<ExceedingRule[]> {
    return this.exceedingRuleModel
      .find({
        'deviceId.type': 'SENSOR'
      })
      .lean()
      .then(rules => {
        return rules.map(rule => {
          // @ts-ignore
          rule.deviceId.type = DeviceTypeConverter.convertToDeviceType(rule.deviceId.type)
          // @ts-ignore
          rule.measure = MeasureConverter.convertToMeasure(rule.measure)
          rule.contactsToNotify.map(contact => {
            // @ts-ignore
            contact.type = ContactTypeConverter.convertToContactType(contact.type)
            return contact
          })
          return rule
        })
      })
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    return this.intrusionRuleModel
      .find({
        'deviceId.type': 'CAMERA'
      })
      .lean()
      .then(rules => {
        return rules.map(rule => {
          // @ts-ignore
          rule.deviceId.type = DeviceTypeConverter.convertToDeviceType(rule.deviceId.type)
          // @ts-ignore
          rule.objectClass = ObjectClassConverter.convertToObjectClass(rule.objectClass)
          rule.contactsToNotify.map(contact => {
            // @ts-ignore
            contact.type = ContactTypeConverter.convertToContactType(contact.type)
            return contact
          })
          return rule
        })
      })
  }

  async getSecurityRuleById(securityRuleId: string): Promise<SecurityRule> {
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

  async insertExceedingSecurityRule(exceedingRule: ExceedingRule): Promise<void> {
    await this.exceedingRuleModel.create({
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
  }

  async insertIntrusionSecurityRule(intrusionRule: IntrusionRule): Promise<void> {
    await this.intrusionRuleModel.create({
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
  }

  async updateExceedingSecurityRule(exceedingRule: ExceedingRule): Promise<void> {
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

  async deleteExceedingRule(exceedingRuleId: string): Promise<void> {
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

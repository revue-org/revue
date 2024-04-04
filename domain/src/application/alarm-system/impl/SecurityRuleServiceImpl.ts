import { SecurityRuleService } from '../SecurityRuleService.js'
import { ExceedingRule } from '../../../domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from '../../../domain/alarm-system/core/IntrusionRule.js'
import { SecurityRule } from '../../../domain/alarm-system/core/SecurityRule.js'
import { EnvironmentData } from '../../../domain/device/core/EnvironmentData.js'
import { DeviceType } from '../../../domain/device/core/impl/enum/DeviceType.js'
import { SecurityRuleRepository } from '../../../domain/alarm-system/repositories/SecurityRuleRepository.js'
import { Anomaly } from '../../../domain/alarm-system/core/Anomaly.js'
import { ObjectClass } from '../../../domain/alarm-system/core/impl/enum/ObjectClass.js'
import { Intrusion } from '../../../domain/alarm-system/core/Intrusion.js'
import { DeviceId } from '../../../domain/device/core/DeviceId.js'
import { Contact } from '../../../domain/monitoring/core/Contact.js'
import { Exceeding } from '../../../domain/alarm-system/core/Exceeding.js'

export class SecurityRuleServiceImpl implements SecurityRuleService {
  private securityRuleRepository: SecurityRuleRepository

  constructor(securityRuleRepository: SecurityRuleRepository) {
    this.securityRuleRepository = securityRuleRepository
  }

  async getActiveRules(): Promise<SecurityRule[]> {
    const rules: SecurityRule[] = (await this.securityRuleRepository.getExceedingRules())
    rules.concat(await this.securityRuleRepository.getIntrusionRules())
    return rules.filter((rule: SecurityRule) => this.hourComparator(new Date(), rule.from, rule.to))
  }

  async getActiveExceedingRules(): Promise<ExceedingRule[]> {
    return (await this.getActiveRules()).filter(
      (rule: SecurityRule): boolean => rule.deviceId.type === DeviceType.SENSOR
    ) as ExceedingRule[]
  }

  async getActiveIntrusionRules(): Promise<IntrusionRule[]> {
    return (await this.getActiveRules()).filter(
      (rule: SecurityRule): boolean => rule.deviceId.type === DeviceType.CAMERA
    ) as IntrusionRule[]
  }

  insertExceedingSecurityRule(exceedingRule: ExceedingRule): void {
    this.securityRuleRepository.insertExceedingSecurityRule(exceedingRule)
  }

  insertIntrusionSecurityRule(intrusionRule: IntrusionRule): void {
    this.securityRuleRepository.insertIntrusionSecurityRule(intrusionRule)
  }

  deleteExceedingRule(id: string): void {
    this.securityRuleRepository.deleteExceedingRule(id)
  }

  deleteIntrusionRule(id: string): void {
    this.securityRuleRepository.deleteIntrusionRule(id)
  }

  async getExceedingRules(): Promise<ExceedingRule[]> {
    return await this.securityRuleRepository.getExceedingRules()
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    return await this.securityRuleRepository.getIntrusionRules()
  }

  getSecurityRuleById(id: string): Promise<SecurityRule> {
    return this.securityRuleRepository.getSecurityRuleById(id)
  }

  updateExceedingSecurityRule(exceedingRule: ExceedingRule): void {
    this.securityRuleRepository.updateExceedingSecurityRule(exceedingRule)
  }

  updateIntrusionSecurityRule(intrusionRule: IntrusionRule): void {
    this.securityRuleRepository.updateIntrusionSecurityRule(intrusionRule)
  }

  async checkExceedingDetection(environmentData: EnvironmentData): Promise<boolean> {
    return (
      (await this.getActiveExceedingRules()).filter(
        (rule: ExceedingRule) =>
          this.hourComparator(environmentData.timestamp, rule.from, rule.to) &&
          rule.deviceId.code === environmentData.sourceDeviceId.code &&
          rule.measure === environmentData.measure &&
          (environmentData.value < rule.min || environmentData.value > rule.max)
      ).length > 0
    )
  }

  async checkIntrusionDetection(cameraId: DeviceId, objectClass: ObjectClass, timestamp: Date): Promise<boolean> {
    return (
      (await this.getActiveIntrusionRules()).filter(
        (rule: IntrusionRule) =>
          this.hourComparator(timestamp, rule.from, rule.to) &&
          rule.deviceId.code === cameraId.code &&
          rule.objectClass === objectClass
      ).length > 0
    )
  }

  async getContactsToNotify(anomaly: Anomaly): Promise<Contact[]> {
    switch (anomaly.deviceId.type) {
      case DeviceType.CAMERA:
        return (await this.getActiveIntrusionRules())
          .filter(
            (rule: IntrusionRule) =>
              this.hourComparator(anomaly.timestamp, rule.from, rule.to) &&
              rule.deviceId.code === anomaly.deviceId.code &&
              rule.objectClass === (anomaly as Intrusion).intrusionObject
          )
          .flatMap((rule: IntrusionRule) => rule.contactsToNotify)
      case DeviceType.SENSOR:
        return (await this.getActiveExceedingRules())
          .filter(
            (rule: ExceedingRule) =>
              this.hourComparator(anomaly.timestamp, rule.from, rule.to) &&
              rule.deviceId.code === anomaly.deviceId.code &&
              rule.measure === (anomaly as Exceeding).measure
          )
          .flatMap((rule: ExceedingRule) => rule.contactsToNotify)
    }
  }

  hourComparator = (date: Date, from: Date, to: Date): boolean => {
    //TODO to check if the date is in the range
    return (
      (date.getHours() > from.getHours() ||
        (date.getHours() === from.getHours() && date.getMinutes() >= from.getMinutes())) &&
      (date.getHours() < to.getHours() ||
        (date.getHours() === to.getHours() && date.getMinutes() <= to.getMinutes()))
    )
  }
}

import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRulesRepository } from '../repositories/SecurityRulesRepository'
import { SecurityRuleService } from './SecurityRuleService'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'

export class SecurityRuleServiceImpl implements SecurityRuleService {
  private repository: SecurityRulesRepository

  constructor(repository: SecurityRulesRepository) {
    this.repository = repository
  }

  async getRangeRules(): Promise<RangeRule[]> {
    return await this.repository.getRangeRules()
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    return await this.repository.getIntrusionRules()
  }

  async getSecurityRuleById(id: SecurityRuleId): Promise<SecurityRule> {
    return this.repository.getSecurityRuleById(id)
  }

  createRangeRule(rangeRule: RangeRule): void {
    this.repository.saveSecurityRule(rangeRule)
  }

  createIntrusionRule(intrusionRule: IntrusionRule): void {
    this.repository.saveSecurityRule(intrusionRule)
  }

  updateRangeRule(exceedingRule: RangeRule): void {
    this.repository.updateSecurityRule(exceedingRule)
  }

  updateIntrusionRule(intrusionRule: IntrusionRule): void {
    this.repository.updateSecurityRule(intrusionRule)
  }

  deleteSecurityRule(id: SecurityRuleId): void {
    this.repository.removeSecurityRule(id)
  }

  async isOutlier(deviceId: DeviceId, measurement: Measurement): Promise<boolean> {
    return (
      (await this.getActiveRangeRules()).filter(
        (rule: RangeRule) =>
          this.hourComparator(environmentData.timestamp, rule.from, rule.to) &&
          rule.deviceId.code === environmentData.sourceDeviceId.code &&
          rule.measure === environmentData.measure &&
          (environmentData.value < rule.min || environmentData.value > rule.max)
      ).length > 0
    )
  }

  async isIntrusion(deviceId: DeviceId, objectClass: ObjectClass, timestamp: Date): Promise<boolean> {
    return (
      (await this.getActiveIntrusionRules()).filter(
        (rule: IntrusionRule) =>
          this.hourComparator(timestamp, rule.from, rule.to) &&
          rule.deviceId.code === cameraId.code &&
          rule.objectClass === objectClass
      ).length > 0
    )
  }

  async getActiveRules(): Promise<SecurityRule[]> {
    const exceedingRules: SecurityRule[] = await this.repository.getRangeRules()
    const intrusionRules: SecurityRule[] = await this.repository.getIntrusionRules()
    const rules: SecurityRule[] = exceedingRules.concat(intrusionRules)
    return rules.filter((rule: SecurityRule) => this.hourComparator(new Date(), rule.from, rule.to))
  }

  async getActiveRangeRules(): Promise<RangeRule[]> {
    return (await this.getActiveRules()).filter(
      (rule: SecurityRule): boolean => rule.activeOn.type === DeviceType.SENSOR
    ) as RangeRule[]
  }

  async getActiveIntrusionRules(): Promise<IntrusionRule[]> {
    return (await this.getActiveRules()).filter(
      (rule: SecurityRule): boolean => rule.activeOn.type === DeviceType.CAMERA
    ) as IntrusionRule[]
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
        return (await this.getActiveRangeRules())
          .filter(
            (rule: RangeRule) =>
              this.hourComparator(anomaly.timestamp, rule.from, rule.to) &&
              rule.deviceId.code === anomaly.deviceId.code &&
              rule.measure === (anomaly as Exceeding).measure
          )
          .flatMap((rule: RangeRule) => rule.contactsToNotify)
    }
  }

  hourComparator = (date: Date, from: Date, to: Date): boolean => {
    date.setHours(date.getHours() + 1) // correction due to timezone
    return (
      (date.getHours() > from.getHours() ||
        (date.getHours() === from.getHours() && date.getMinutes() >= from.getMinutes())) &&
      (date.getHours() < to.getHours() ||
        (date.getHours() === to.getHours() && date.getMinutes() <= to.getMinutes()))
    )
  }
}

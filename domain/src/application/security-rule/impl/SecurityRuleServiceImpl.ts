import { SecurityRuleService } from '../SecurityRuleService'
import { ExceedingRule } from '../../../domain/security-rule/core/ExceedingRule.js'
import { IntrusionRule } from '../../../domain/security-rule/core/IntrusionRule.js'
import { SecurityRule } from '../../../domain/security-rule/core/SecurityRule.js'
import { EnvironmentData } from '../../../domain/device/core/EnvironmentData.js'
import { DeviceType } from '../../../domain/device/core/impl/enum/DeviceType.js'
import { DeviceTypeConverter } from '../../../utils/DeviceTypeConverter.js'
import { MeasureConverter } from '../../../utils/MeasureConverter.js'

export class SecurityRuleServiceImpl implements SecurityRuleService {
  private securityRules: SecurityRule[] = []

  addSecurityRule(securityRule: SecurityRule): void {
    this.securityRules.push(securityRule)
  }

  addSecurityRules(securityRules: SecurityRule[]): void {
    this.securityRules.push(...securityRules)
  }

  removeSecurityRule(securityRuleId: string): void {
    this.securityRules = this.securityRules.filter(
      (rule: SecurityRule) => rule.securityRuleId !== securityRuleId
    )
  }

  updateSecurityRule(securityRule: SecurityRule): void {
    this.securityRules = this.securityRules.map((rule: SecurityRule) => {
      if (rule.securityRuleId === securityRule.securityRuleId) {
        return securityRule
      }
      return rule
    })
  }

  getActiveRules(): SecurityRule[] {
    return this.securityRules.filter((rule: SecurityRule) =>
      this.hourComparator(new Date(), rule.from, rule.to)
    )
  }

  getActiveExceedingRules(): ExceedingRule[] {
    return this.getActiveRules().filter(
      // @ts-ignore
      (rule: SecurityRule) => rule.deviceId.type === DeviceType.SENSOR
    ) as ExceedingRule[]
  }

  getActiveIntrusionRules(): IntrusionRule[] {
    return this.getActiveRules().filter(
      // @ts-ignore
      (rule: SecurityRule) => rule.deviceId.type === DeviceType.CAMERA
    ) as IntrusionRule[]
  }

  checkExceedingDetection(environmentData: EnvironmentData): boolean {
    return (
      this.getActiveExceedingRules().filter(
        (rule: ExceedingRule) =>
          this.hourComparator(environmentData.timestamp, rule.from, rule.to) &&
          rule.deviceId.code === environmentData.sourceDeviceId.code &&
          rule.measure === environmentData.measure &&
          (environmentData.value < rule.min || environmentData.value > rule.max)
      ).length > 0
    )
  }

  checkIntrusionDetection(detection: any): boolean {
    //TODO TO IMPLEMENT
    return false
  }

  hourComparator = (date: Date, from: Date, to: Date): boolean => {
    return (
      (date.getHours() > from.getHours() ||
        (date.getHours() === from.getHours() && date.getMinutes() >= from.getMinutes())) &&
      (date.getHours() < to.getHours() ||
        (date.getHours() === to.getHours() && date.getMinutes() <= to.getMinutes()))
    )
  }
}

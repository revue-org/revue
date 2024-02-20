import { SecurityRuleService } from '../SecurityRuleService'
import { ExceedingRule, IntrusionRule, SecurityRule } from '../../../domain/security-rule/core'
import { DeviceType, EnvironmentData } from '../../../domain/device/core'

export class SecurityRuleServiceImpl implements SecurityRuleService {
  private securityRules: SecurityRule[] = []

  addSecurityRule(securityRule: SecurityRule): void {
    this.securityRules.push(securityRule)
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
    return this.securityRules.filter((rule: SecurityRule) => rule.from < new Date() && rule.to > new Date())
  }

  getActiveExceedingRules(): ExceedingRule[] {
    return this.securityRules.filter(
      (rule: SecurityRule) =>
        rule.from < new Date() && rule.to > new Date() && rule.deviceId.type === DeviceType.SENSOR
    ) as ExceedingRule[]
  }

  getActiveIntrusionRules(): IntrusionRule[] {
    return this.securityRules.filter(
      (rule: SecurityRule) =>
        rule.from < new Date() && rule.to > new Date() && rule.deviceId.type === DeviceType.CAMERA
    ) as IntrusionRule[]
  }

  checkExceedingDetection(environmentData: EnvironmentData): boolean {
    return (
      this.getActiveExceedingRules().filter(
        (rule: ExceedingRule) =>
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
}

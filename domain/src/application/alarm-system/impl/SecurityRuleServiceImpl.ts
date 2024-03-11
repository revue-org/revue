import { SecurityRuleService } from '../SecurityRuleService.js'
import { ExceedingRule } from '../../../domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from '../../../domain/alarm-system/core/IntrusionRule.js'
import { SecurityRule } from '../../../domain/alarm-system/core/SecurityRule.js'
import { EnvironmentData } from '../../../domain/device/core/EnvironmentData.js'
import { DeviceType } from '../../../domain/device/core/impl/enum/DeviceType.js'
import { SecurityRuleRepository } from '../../../domain/alarm-system/repositories/SecurityRuleRepository.js'

export class SecurityRuleServiceImpl implements SecurityRuleService {
  private securityRuleRepository: SecurityRuleRepository
  private securityRules: SecurityRule[] = []

  constructor(securityRuleRepository: SecurityRuleRepository) {
    this.securityRuleRepository = securityRuleRepository
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

  insertExceedingSecurityRule(exceedingRule: ExceedingRule): void {
    this.securityRuleRepository.insertExceedingSecurityRule(exceedingRule).then((): void => {
      this.securityRules.push(exceedingRule)
    })
  }

  insertIntrusionSecurityRule(intrusionRule: IntrusionRule): void {
    this.securityRuleRepository.insertIntrusionSecurityRule(intrusionRule).then((): void => {
      this.securityRules.push(intrusionRule)
    })
  }

  deleteExceedingRule(id: string): void {
    this.securityRuleRepository.deleteExceedingRule(id).then((): void => {
      this.securityRules = this.securityRules.filter((rule: SecurityRule) => rule.securityRuleId !== id)
    })
  }

  deleteIntrusionRule(id: string): void {
    this.securityRuleRepository.deleteIntrusionRule(id).then((): void => {
      this.securityRules = this.securityRules.filter((rule: SecurityRule) => rule.securityRuleId !== id)
    })
  }

  async getExceedingRules(): Promise<ExceedingRule[]> {
    const rules: ExceedingRule[] = await this.securityRuleRepository.getExceedingRules()
    this.securityRules = this.securityRules.concat(rules)
    return rules
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    const rules: IntrusionRule[] = await this.securityRuleRepository.getIntrusionRules()
    this.securityRules = this.securityRules.concat(rules)
    return rules
  }

  getSecurityRuleById(id: string): Promise<SecurityRule> {
    return this.securityRuleRepository.getSecurityRuleById(id)
  }

  updateExceedingSecurityRule(exceedingRule: ExceedingRule): void {
    this.securityRuleRepository.updateExceedingSecurityRule(exceedingRule).then((): void => {
      this.securityRules = this.securityRules.map(
        (rule: SecurityRule): SecurityRule =>
          rule.securityRuleId === exceedingRule.securityRuleId ? exceedingRule : rule
      )
    })
  }

  updateIntrusionSecurityRule(intrusionRule: IntrusionRule): void {
    this.securityRuleRepository.updateIntrusionSecurityRule(intrusionRule).then((): void => {
      this.securityRules = this.securityRules.map(
        (rule: SecurityRule): SecurityRule =>
          rule.securityRuleId === intrusionRule.securityRuleId ? intrusionRule : rule
      )
    })
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

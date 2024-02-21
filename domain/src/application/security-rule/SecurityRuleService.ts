import { SecurityRule } from '../../domain/security-rule/core/SecurityRule.js'
import { EnvironmentData } from "../../domain/device/core";

export interface SecurityRuleService {
  addSecurityRule(securityRule: SecurityRule): void

  addSecurityRules(securityRules: SecurityRule[]): void

  removeSecurityRule(securityRuleId: string): void

  updateSecurityRule(securityRule: SecurityRule): void

  checkExceedingDetection(environmentData: EnvironmentData): boolean

  //TODO to model the intrusion detection, maybe a class detection is needed(?)
  checkIntrusionDetection(detection: any): boolean
}

import { SecurityRule } from '../../domain/alarm-system/core/SecurityRule.js'
import { ExceedingRule } from '../../domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from '../../domain/alarm-system/core/IntrusionRule.js'
import { EnvironmentData } from "../../domain/device/core/EnvironmentData.js";

export interface SecurityRuleService {
  getSecurityRuleById(id: string): Promise<SecurityRule>

  getExceedingRules(): Promise<ExceedingRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>

  insertExceedingSecurityRule(exceedingRule: ExceedingRule): void

  insertIntrusionSecurityRule(intrusionRule: IntrusionRule): void

  updateExceedingSecurityRule(exceedingRule: ExceedingRule): void

  updateIntrusionSecurityRule(intrusionRule: IntrusionRule): void

  deleteExceedingRule(id: string): void

  deleteIntrusionRule(id: string): void

  checkExceedingDetection(environmentData: EnvironmentData): boolean

  checkIntrusionDetection(detection: any): boolean
}

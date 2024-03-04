import { SecurityRule } from '../../domain/alarm-system/core/SecurityRule.js'
import { DeviceId, EnvironmentData, Measure } from "../../domain/device/core";
import { Contact } from "../../domain/monitoring/core";
import { ExceedingRule, IntrusionRule } from "../../domain/alarm-system/core";

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

}
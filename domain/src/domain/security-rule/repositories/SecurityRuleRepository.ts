import { SecurityRule } from '../core/SecurityRule.js'
import { IntrusionRule } from '../core/IntrusionRule.js'
import { ExceedingRule } from '../core/ExceedingRule.js'
import { AnomalyType } from '../../anomaly/core/impl/enum/AnomalyType.js'

export interface SecurityRuleRepository {
  getExceedingRules(): Promise<ExceedingRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>

  getSecurityRuleById(securityRuleId: string): Promise<SecurityRule>

  insertExceedingSecurityRule(exceedingRule: ExceedingRule): Promise<void>

  insertIntrusionSecurityRule(intrusionRule: IntrusionRule): Promise<void>

  updateExceedingSecurityRule(exceedingRule: ExceedingRule): Promise<void>

  updateIntrusionSecurityRule(intrusionRule: IntrusionRule): Promise<void>

  deleteSecurityRule(securityRuleId: string, type: AnomalyType): Promise<void>
}

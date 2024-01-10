import { SecurityRule } from '../core/SecurityRule.js'
import { IntrusionRule } from '../core/IntrusionRule.js'
import { ExceedingRule } from '../core/ExceedingRule.js'

export interface SecurityRuleRepository {
  getExceedingRules(): Promise<ExceedingRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>

  getSecurityRuleById(securityRuleId: string): Promise<ExceedingRule | IntrusionRule>

  insertSecurityRule(securityRule: SecurityRule): Promise<void>

  updateSecurityRule(securityRule: SecurityRule): Promise<void>

  deleteSecurityRule(securityRuleId: string): Promise<void>
}

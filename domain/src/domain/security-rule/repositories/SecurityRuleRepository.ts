import { SecurityRule } from '../core/SecurityRule.js'
import { IntrusionRule } from '../core/IntrusionRule'
import { ExceedingRule } from '../core/ExceedingRule'

export interface SecurityRuleRepository {
  getExceedingRules(): Promise<Array<ExceedingRule>>

  getIntrusionRules(): Promise<Array<IntrusionRule>>

  getSecurityRule(securityRuleId: number): Promise<ExceedingRule | IntrusionRule>

  insertSecurityRule(securityRule: SecurityRule): Promise<void>

  updateSecurityRule(securityRule: SecurityRule): Promise<void>

  deleteSecurityRule(securityRuleId: number): Promise<void>
}

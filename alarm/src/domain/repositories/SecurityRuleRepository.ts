import { IntrusionRule } from '../core/rules/IntrusionRule.js'
import { RangeRule } from '../core/rules/RangeRule.js'
import { SecurityRule } from '../core/rules/SecurityRule.js'
import { SecurityRuleId } from '../core/rules/SecurityRuleId.js'

export interface SecurityRuleRepository {

  getSecurityRules(): Promise<SecurityRule[]>

  getSecurityRuleById(): Promise<SecurityRule>

  saveSecurityRule(securityRule: SecurityRule): Promise<void>

  updateSecurityRule(securityRule: SecurityRule): Promise<void>

  removeSecurityRule(securityRuleId: SecurityRuleId): Promise<void>

  getRangeRules(): Promise<RangeRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>

}

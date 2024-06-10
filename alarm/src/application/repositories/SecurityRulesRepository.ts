import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'

export interface SecurityRulesRepository {
  getSecurityRules(): Promise<SecurityRule[]>

  getSecurityRuleById(id: SecurityRuleId): Promise<SecurityRule>

  saveSecurityRule(securityRule: SecurityRule): Promise<void>

  updateSecurityRule(securityRule: SecurityRule): Promise<void>

  removeSecurityRule(securityRuleId: SecurityRuleId): Promise<void>

  getRangeRules(): Promise<RangeRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>
}

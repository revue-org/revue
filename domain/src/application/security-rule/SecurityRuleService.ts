import { SecurityRule } from '../../domain/security-rule/core/SecurityRule.js'

export interface SecurityRuleService {
  addSecurityRule(securityRule: SecurityRule): void

  removeSecurityRule(securityRuleId: number): void
}

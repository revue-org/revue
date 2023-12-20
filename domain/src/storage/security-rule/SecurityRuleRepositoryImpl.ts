import { SecurityRuleRepository } from '../../domain/security-rule/repositories/SecurityRuleRepository.js'
import { SecurityRule } from '../../domain/security-rule/core/SecurityRule.js'

class SecurityRuleRepositoryImpl implements SecurityRuleRepository {
  getSecurityRules(): Set<SecurityRule> {
    return new Set<SecurityRule>()
  }

  insertSecurityRule(securityRule: SecurityRule): void {}

  deleteSecurityRule(securityRule: SecurityRule): void {}
}

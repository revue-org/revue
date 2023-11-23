import {SecurityRuleRepository} from "../../../domain/security-rule/repositories/SecurityRuleRepository";
import {SecurityRule} from "../../../domain/security-rule/core/SecurityRule";

class SecurityRuleRepositoryImpl implements SecurityRuleRepository {
    getSecurityRules(): Set<SecurityRule> {
        return new Set<SecurityRule>();
    }

    insertSecurityRule(securityRule: SecurityRule): void {
    }

    deleteSecurityRule(securityRule: SecurityRule): void {
    }
}

import { SecurityRuleService } from "../SecurityRuleService";
import { SecurityRule } from "../../../domain/security-rule/core";
import { EnvironmentData } from "../../../domain/device/core";


export class SecurityRuleServiceImpl implements SecurityRuleService {
  private securityRules: SecurityRule[] = []
  addSecurityRule(securityRule: SecurityRule): void {
    this.securityRules.push(securityRule)
  }

  removeSecurityRule(securityRuleId: string): void {
    this.securityRules = this.securityRules.filter((rule: SecurityRule) => rule.securityRuleId !== securityRuleId)
  }

  updateSecurityRule(securityRule: SecurityRule): void {
    this.securityRules = this.securityRules.map((rule: SecurityRule) => {
      if (rule.securityRuleId === securityRule.securityRuleId) {
        return securityRule
      }
      return rule
    })
  }

  checkExceedingDetection(environmentData: EnvironmentData): boolean {

    return true


  }

  checkIntrusionDetection(detection: any): boolean {
    //TODO TO IMPLEMENT
    return false;
  }

}
import { IntrusionRule } from "@/domain/core/rules/IntrusionRule"
import { RangeRule } from "@/domain/core/rules/RangeRule"
import { SecurityRule } from "@/domain/core/rules/SecurityRule"
import { SecurityRuleId } from "@/domain/core/rules/SecurityRuleId"

export interface SecurityRuleService {

  getSecurityRuleById(id: SecurityRuleId): Promise<SecurityRule>

  getRangeRules(): Promise<RangeRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>

  createRangeRule(rangeRule: RangeRule): void

  createIntrusionRule(intrusionRule: IntrusionRule): void

  updateRangeRule(exceedingRule: RangeRule): void

  updateIntrusionRule(intrusionRule: IntrusionRule): void

  deleteSecurityRule(id: SecurityRuleId): void

  isOutlier(deviceId: DeviceId, measurement: Measurement): Promise<boolean>

  isIntrusion(deviceId: DeviceId, objectClass: ObjectClass, timestamp: Date): Promise<boolean>

}

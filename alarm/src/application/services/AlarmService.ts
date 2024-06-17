import { Measurement } from '@common/domain/core/Measurement'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { ObjectClass } from '@/domain/core/ObjectClass'

export interface AlarmService {
  getSecurityRuleById(id: SecurityRuleId): Promise<SecurityRule>

  getRangeRules(): Promise<RangeRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>

  createRangeRule(rangeRule: RangeRule): void

  createIntrusionRule(intrusionRule: IntrusionRule): void

  updateRangeRule(exceedingRule: RangeRule): void

  updateIntrusionRule(intrusionRule: IntrusionRule): void

  deleteSecurityRule(id: SecurityRuleId): void

  isOutlier(sensorId: string, measure: Measure, value: Float, timestamp: Date): Promise<boolean>

  isIntrusion(deviceId: string, objectClass: ObjectClass, timestamp: Date): Promise<boolean>
}

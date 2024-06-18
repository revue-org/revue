import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { Contact, Detection, Measure, Measurement, ObjectClass } from '@common/domain/core'

export interface AlarmService {
  getSecurityRuleById(id: SecurityRuleId): Promise<SecurityRule>

  getRangeRules(): Promise<RangeRule[]>

  getIntrusionRules(): Promise<IntrusionRule[]>

  createRangeRule(
    creatorId: string,
    activeOn: string,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    minValue: number,
    maxValue: number,
    measure: Measure
  ): Promise<SecurityRuleId>

  createIntrusionRule(
    creatorId: string,
    activeOn: string,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    intrusionObject: ObjectClass
  ): Promise<SecurityRuleId>

  updateRangeRule(
    rangeRuleId: SecurityRuleId,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    minValue: number,
    maxValue: number
  ): Promise<void>

  updateIntrusionRule(
    intrusionRuleId: SecurityRuleId,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    intrusionObject: ObjectClass
  ): Promise<void>

  enableSecurityRule(id: SecurityRuleId): Promise<void>

  disableSecurityRule(id: SecurityRuleId): Promise<void>

  deleteSecurityRule(id: SecurityRuleId): Promise<void>

  checkIntrusion(detection: Detection): Promise<boolean>

  checkMeasurement(measurement: Measurement): Promise<boolean>

  createIntrusion(detection: Detection): void

  createOutlier(measurement: Measurement): void
}

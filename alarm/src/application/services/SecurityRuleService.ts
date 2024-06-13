import { ObjectClass } from '@/domain/core/ObjectClass'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { Contact } from 'common/dist/domain/core/Contact'
import { MeasureType } from 'common/dist/domain/core/MeasureType'

export interface SecurityRuleService {
  getSecurityRuleById(id: SecurityRuleId | string): Promise<SecurityRule>

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
    measure: MeasureType
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
    rangeRuleId: SecurityRuleId | string,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    minValue: number,
    maxValue: number
  ): Promise<void>

  updateIntrusionRule(
    intrusionRuleId: SecurityRuleId | string,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    intrusionObject: ObjectClass
  ): Promise<void>

  enableSecurityRule(id: SecurityRuleId | string): Promise<void>

  disableSecurityRule(id: SecurityRuleId | string): Promise<void>

  deleteSecurityRule(id: SecurityRuleId): Promise<void>

  isOutlier(deviceId: string, measurement: Measurement): Promise<boolean>

  isIntrusion(deviceId: string, objectClass: ObjectClass, timestamp: Date): Promise<boolean>
}

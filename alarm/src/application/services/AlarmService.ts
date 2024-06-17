import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { Contact } from 'common/dist/domain/core/Contact'
import { MeasureType } from 'common/dist/domain/core/MeasureType'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { ObjectClass } from '@/domain/core/ObjectClass'

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
}

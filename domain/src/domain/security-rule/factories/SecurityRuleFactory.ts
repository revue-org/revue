import { IntrusionRule } from '../core/IntrusionRule.js'
import { ExceedingRule } from '../core/ExceedingRule.js'
import { ObjectClass } from '../core/impl/ObjectClass'
import { DeviceId } from '../../device/core/DeviceId'
import { Contact } from '../../monitoring/core/Contact'
import { Measure } from '../../device/core/impl/enum/Measure'

export interface SecurityRuleFactory {
  createIntrusionRule(
    objectClass: ObjectClass,
    securityRuleId: string,
    deviceId: DeviceId,
    creatorId: string,
    contactsToNotify: Set<Contact>,
    description: string,
    from: Date,
    to: Date
  ): IntrusionRule

  createExceedingRule(
    min: number,
    max: number,
    measure: Measure,
    securityRuleId: string,
    deviceId: DeviceId,
    creatorId: string,
    contactsToNotify: Set<Contact>,
    description: string,
    from: Date,
    to: Date
  ): ExceedingRule
}

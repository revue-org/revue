import { IntrusionRule } from '../core/IntrusionRule.js'
import { ExceedingRule } from '../core/ExceedingRule.js'
import { ObjectClass } from '../core/impl/enum/ObjectClass.js'
import { DeviceId } from '../../device/core/DeviceId.js'
import { Contact } from '../../monitoring/core/Contact.js'
import { Measure } from '../../device/core/impl/enum/Measure.js'

export interface SecurityRuleFactory {
  createIntrusionRule(
    objectClass: ObjectClass,
    securityRuleId: string,
    deviceId: DeviceId,
    creatorId: string,
    contactsToNotify: Contact[],
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
    contactsToNotify: Contact[],
    description: string,
    from: Date,
    to: Date
  ): ExceedingRule
}

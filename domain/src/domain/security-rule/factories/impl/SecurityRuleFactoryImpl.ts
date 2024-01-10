import { SecurityRuleFactory } from '../SecurityRuleFactory.js'
import { IntrusionRule } from '../../core/IntrusionRule.js'
import { ExceedingRule } from '../../core/ExceedingRule.js'
import { IntrusionRuleImpl } from '../../core/impl/IntrusionRuleImpl.js'
import { ExceedingRuleImpl } from '../../core/impl/ExceedingRuleImpl.js'
import { ObjectClass } from '../../core/impl/enum/ObjectClass.js'
import { DeviceId } from '../../../device/core/DeviceId.js'
import { Contact } from '../../../monitoring/core/Contact.js'
import { Measure } from '../../../device/core/impl/enum/Measure.js'

export class SecurityRuleFactoryImpl implements SecurityRuleFactory {
  createIntrusionRule(
    objectClass: ObjectClass,
    securityRuleId: string,
    deviceId: DeviceId,
    creatorId: string,
    contactsToNotify: Set<Contact>,
    description: string,
    from: Date,
    to: Date
  ): IntrusionRule {
    return new IntrusionRuleImpl(
      objectClass,
      securityRuleId,
      deviceId,
      creatorId,
      contactsToNotify,
      description,
      from,
      to
    )
  }

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
  ): ExceedingRule {
    return new ExceedingRuleImpl(
      min,
      max,
      measure,
      securityRuleId,
      deviceId,
      creatorId,
      contactsToNotify,
      description,
      from,
      to
    )
  }
}

import { SecurityRuleFactory } from '../SecurityRuleFactory'
import { IntrusionRule } from '../../core/IntrusionRule'
import { ExceedingRule } from '../../core/ExceedingRule'
import { IntrusionRuleImpl } from '../../core/impl/IntrusionRuleImpl'
import { ExceedingRuleImpl } from '../../core/impl/ExceedingRuleImpl'
import { ObjectClass } from '../../core/impl/ObjectClass'
import { DeviceId } from '../../../device/core/DeviceId'
import { Contact } from '../../../monitoring/core/Contact'
import { Measure } from '../../../device/core/impl/enum/Measure'

export class SecurityRuleFactoryImpl implements SecurityRuleFactory {
  createIntrusionRule(
    objectClass: ObjectClass,
    securityRuleId: string,
    deviceId: DeviceId,
    creatorId: number,
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
    creatorId: number,
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

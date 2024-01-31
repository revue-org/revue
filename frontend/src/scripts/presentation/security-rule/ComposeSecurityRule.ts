import type { ExceedingRule, IntrusionRule } from 'domain/dist/domain/security-rule/core'
import { ContactTypeConverter, MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'
import type { Contact } from 'domain/dist/domain/monitoring/core'
import { type SecurityRuleFactory, SecurityRuleFactoryImpl } from 'domain/dist/domain/security-rule/factories'
import { type DeviceIdFactory, DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories'
import { type ContactFactory, ContactFactoryImpl } from 'domain/dist/domain/monitoring/factories'

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const contactFactory: ContactFactory = new ContactFactoryImpl()

export function composeExceedingSecurityRule(exceedingRule: any): ExceedingRule {
  return securityRuleFactory.createExceedingRule(
    exceedingRule.minValue,
    exceedingRule.maxValue,
    MeasureConverter.convertToMeasure(exceedingRule.measure),
    exceedingRule._id,
    deviceIdFactory.createSensorId(exceedingRule.deviceId.code),
    exceedingRule.creatorId,
    composeContacts(exceedingRule.contacts),
    exceedingRule.description,
    new Date(exceedingRule.from),
    new Date(exceedingRule.to)
  )
}

export function composeIntrusionSecurityRule(intrusionRule: any): IntrusionRule {
  return securityRuleFactory.createIntrusionRule(
    ObjectClassConverter.convertToObjectClass(intrusionRule.objectClass),
    intrusionRule._id,
    deviceIdFactory.createCameraId(intrusionRule.deviceId.code),
    intrusionRule.creatorId,
    composeContacts(intrusionRule.contacts),
    intrusionRule.description,
    new Date(intrusionRule.from),
    new Date(intrusionRule.to)
  )
}

function composeContacts(contacts: any): Contact[] {
  return contacts.map((contact: any) => {
    return contactFactory.createContact(
      contact.value,
      ContactTypeConverter.convertToContactType(contact.type)
    )
  })
}

import type { ExceedingRule, IntrusionRule } from 'domain/dist/domain/alarm-system/core'
import type { Contact } from 'domain/dist/domain/monitoring/core'
import { type SecurityRuleFactory, SecurityRuleFactoryImpl } from 'domain/dist/domain/alarm-system/factories'
import { type DeviceIdFactory, DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories'
import { type ContactFactory, ContactFactoryImpl } from 'domain/dist/domain/monitoring/factories'

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const contactFactory: ContactFactory = new ContactFactoryImpl()

export function composeExceedingSecurityRule(exceedingRule: any): ExceedingRule {
  const fromDate: Date = new Date(exceedingRule.from)
  fromDate.setHours(fromDate.getHours() - 1)
  const toDate: Date = new Date(exceedingRule.to)
  toDate.setHours(toDate.getHours() - 1)
  return securityRuleFactory.createExceedingRule(
    exceedingRule.min,
    exceedingRule.max,
    exceedingRule.measure,
    exceedingRule._id,
    deviceIdFactory.createSensorId(exceedingRule.deviceId.code),
    exceedingRule.creatorId,
    composeContacts(exceedingRule.contactsToNotify),
    exceedingRule.description,
    fromDate,
    toDate
  )
}

export function composeIntrusionSecurityRule(intrusionRule: any): IntrusionRule {
  const fromDate: Date = new Date(intrusionRule.from)
  fromDate.setHours(fromDate.getHours() - 1)
  const toDate: Date = new Date(intrusionRule.to)
  toDate.setHours(toDate.getHours() - 1)
  return securityRuleFactory.createIntrusionRule(
    intrusionRule.objectClass,
    intrusionRule._id,
    deviceIdFactory.createCameraId(intrusionRule.deviceId.code),
    intrusionRule.creatorId,
    composeContacts(intrusionRule.contactsToNotify),
    intrusionRule.description,
    fromDate,
    toDate
  )
}

function composeContacts(contacts: any): Contact[] {
  return contacts.map((contact: any) => {
    return contactFactory.createContact(contact.value, contact.type)
  })
}

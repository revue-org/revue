import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory.js'
import { ContactFactory } from '@common/domain/factories/ContactFactory.js'
import { Contact, Measure } from '@common/domain/core'
import { ObjectClass } from '@common/domain/core/ObjectClass.js'

export interface SecurityRuleDBEntity {
  id: string
  type: string
  author: string
  activeOn: string
  description: string
  validity: {
    from: Date
    to: Date
  }
  contacts: {
    type: string
    value: string
  }[]
  data: {
    min?: number
    max?: number
    measure?: {
      type: string
      unit: string
    }
    objectClass?: string
  }
  enabled: boolean
}

export class SecurityRuleDBAdapter {
  static asDomainEntity(securityRule: SecurityRuleDBEntity): SecurityRule {
    const contacts: Contact[] = []
    securityRule.contacts.forEach(contactObj => {
      if (contactObj.type == 'email') {
        contacts.push(ContactFactory.createMailContact(contactObj.value))
      } else if (contactObj.type == 'sms') {
        contacts.push(ContactFactory.createSmsContact(contactObj.value))
      }
    })
    if (securityRule.type == 'range') {
      return SecurityRulesFactory.rangeRuleOf(
        SecurityRulesFactory.idOf(securityRule.id),
        securityRule.activeOn,
        securityRule.author,
        contacts,
        securityRule.description,
        SecurityRulesFactory.newTimeSlot(securityRule.validity.from, securityRule.validity.to),
        securityRule.data.min as number,
        securityRule.data.max as number,
        securityRule.data.measure as Measure,
        securityRule.enabled
      )
    } else {
      return SecurityRulesFactory.intrusionRuleOf(
        SecurityRulesFactory.idOf(securityRule.id),
        securityRule.activeOn,
        securityRule.author,
        securityRule.data.objectClass as ObjectClass,
        contacts,
        securityRule.description,
        SecurityRulesFactory.newTimeSlot(securityRule.validity.from, securityRule.validity.to),
        securityRule.enabled
      )
    }
  }

  static asDBEntity(securityRule: SecurityRule): SecurityRuleDBEntity {
    const contacts = securityRule.contacts.map(contact => {
      return {
        type: contact.type,
        value: contact.value
      }
    })
    if (securityRule.type == 'range') {
      const rule: RangeRule = securityRule as RangeRule
      return {
        id: rule.id.value,
        type: 'range',
        author: rule.creatorId,
        activeOn: rule.activeOn,
        description: rule.description,
        validity: {
          from: rule.validity.from,
          to: rule.validity.to
        },
        contacts: contacts,
        data: {
          min: rule.min,
          max: rule.max,
          measure: rule.measure
        },
        enabled: rule.enabled
      }
    } else {
      const rule: IntrusionRule = securityRule as IntrusionRule
      return {
        id: rule.id.value,
        type: 'intrusion',
        author: rule.creatorId,
        activeOn: rule.activeOn,
        description: rule.description,
        validity: {
          from: rule.validity.from,
          to: rule.validity.to
        },
        contacts: contacts,
        data: {
          objectClass: rule.objectClass
        },
        enabled: rule.enabled
      }
    }
  }
}

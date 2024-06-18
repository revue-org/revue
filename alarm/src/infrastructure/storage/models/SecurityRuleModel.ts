import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory'
import { Contact } from '@common/domain/core/Contact'
import { ContactFactory } from '@common/domain/factories/ContactFactory'
import { Measure, ObjectClass } from 'common/dist/domain/core'

export interface SecurityRuleDBEntity {
  id: string
  type: string
  creatorId: string
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
    securityRule.contacts.forEach(contactObj =>{
        if (contactObj.type == 'email') {
          contacts.push(ContactFactory.createMailContact(contactObj.value))
        } else if (contactObj.type == 'sms') {
          contacts.push(ContactFactory.createSmsContact(contactObj.value))
        }
    })
    if (securityRule.type == 'range') {
      return SecurityRulesFactory.createRangeRule(
        SecurityRulesFactory.idOf(securityRule.id),
        securityRule.activeOn,
        securityRule.creatorId,
        contacts,
        securityRule.description,
        SecurityRulesFactory.newTimeSlot(securityRule.validity.from, securityRule.validity.to),
        securityRule.data.min as number,
        securityRule.data.max as number,
        securityRule.data.measure as Measure,
        securityRule.enabled
      )
    } else {
      return SecurityRulesFactory.createIntrusionRule(
        SecurityRulesFactory.idOf(securityRule.id),
        securityRule.activeOn,
        securityRule.creatorId,
        ObjectClass[securityRule.data.objectClass as keyof typeof ObjectClass],
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
      const rule = securityRule as RangeRule
      return {
        id: rule.id.id,
        type: 'range',
        creatorId: rule.creatorId,
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
      const rule = securityRule as IntrusionRule
      return {
        id: rule.id.id,
        type: 'intrusion',
        creatorId: rule.creatorId,
        activeOn: rule.activeOn,
        description: rule.description,
        validity: {
          from: rule.validity.from,
          to: rule.validity.to
        },
        contacts: contacts,
        data: {
          objectClass: rule.objectClass.toString()
        },
        enabled: rule.enabled
      }
    }
  }
}

import { IntrusionRule } from "@/domain/core/rules/IntrusionRule"
import { RangeRule } from "@/domain/core/rules/RangeRule"
import { SecurityRule } from "@/domain/core/rules/SecurityRule"
import { SecurityRulesFactory } from "@/domain/factories/SecurityRulesFactory"

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
        measure?: string
        objectClass?: string
    }
    enabled: boolean
}

export class SecurityRuleDBAdapter {

    static asDomainEntity(securityRule: SecurityRuleDBEntity): SecurityRule {
        const contacts: Contact[] = [];
        securityRule.contacts.forEach(contact => contacts.push(contact));
        if (securityRule.type == 'range') {
            return SecurityRulesFactory.createRangeRule(
                SecurityRulesFactory.idOf(securityRule.id),
                securityRule.activeOn,
                securityRule.creatorId,
                contacts,
                securityRule.description,
                TimeSlotFactory.create(securityRule.validity),
                securityRule.data.min as number,
                securityRule.data.max as number,
                securityRule.data.measure as MeasureType,
                securityRule.enabled
            )
        } else {
            return SecurityRulesFactory.createIntrusionRule(
                SecurityRulesFactory.idOf(securityRule.id),
                securityRule.activeOn,
                securityRule.creatorId,
                securityRule.data.objectClass,
                contacts,
                securityRule.description,
                TimeSlotFactory.create(securityRule.validity),
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
                    measure: rule.measure,
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
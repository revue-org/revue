import { IntrusionRule, RangeRule } from '@/domain/core'

export interface SecurityRulePresenter {

  parseIntrusionRule(obj: object): IntrusionRule

  parseRangeRule(obf: object): RangeRule
}

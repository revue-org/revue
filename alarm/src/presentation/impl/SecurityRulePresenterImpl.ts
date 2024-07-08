import { IntrusionRule, RangeRule } from '@/domain/core'
import { SecurityRulePresenter } from '@/presentation/SecurityRulePresenter'
import { intrusionRuleSchema } from '@/presentation/schemas/SecurityRuleSchema'

class SecurityRulePresenterImpl implements SecurityRulePresenter {
  parseIntrusionRule(obj: object): IntrusionRule {
   return intrusionRuleSchema.parse(obj)
  }

  parseRangeRule(obf: object): RangeRule {
    return undefined
  }
}

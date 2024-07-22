import {
  IntrusionRuleInsertion,
  IntrusionRuleUpdate,
  RangeRuleInsertion,
  RangeRuleUpdate
} from '@/presentation/schemas/SecurityRuleSchema'

export interface SecurityRulePresenter {
  parseIntrusionRuleInsertion(obj: object): IntrusionRuleInsertion

  parseRangeRuleInsertion(obf: object): RangeRuleInsertion

  parseIntrusionRuleUpdate(obj: object): IntrusionRuleUpdate

  parseRangeRuleUpdate(obf: object): RangeRuleUpdate
}

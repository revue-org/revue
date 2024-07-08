import { IntrusionRuleInsertion, RangeRuleInsertion } from '@/presentation/schemas/SecurityRuleSchema'

export interface SecurityRulePresenter {
  parseIntrusionRuleInsertion(obj: object): IntrusionRuleInsertion

  parseRangeRuleInsertion(obf: object): RangeRuleInsertion
}

import { SecurityRulePresenter } from '@/presentation/SecurityRulePresenter'
import {
  IntrusionRuleInsertion,
  intrusionRuleInsertionSchema,
  RangeRuleInsertion,
  rangeRuleInsertionSchema
} from '@/presentation/schemas/SecurityRuleSchema.js'

export class SecurityRulePresenterImpl implements SecurityRulePresenter {
  parseIntrusionRuleInsertion(obj: object): IntrusionRuleInsertion {
    return intrusionRuleInsertionSchema.parse(obj)
  }

  parseRangeRuleInsertion(obj: object): RangeRuleInsertion {
    return rangeRuleInsertionSchema.parse(obj)
  }
}

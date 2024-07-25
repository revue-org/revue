import { SecurityRulePresenter } from '@/presentation/SecurityRulePresenter'
import {
  IntrusionRuleInsertion,
  intrusionRuleInsertionSchema,
  IntrusionRuleUpdate,
  intrusionRuleUpdateSchema,
  RangeRuleInsertion,
  rangeRuleInsertionSchema,
  RangeRuleUpdate,
  rangeRuleUpdateSchema
} from '@/presentation/schemas/SecurityRuleSchema.js'

export class SecurityRulePresenterImpl implements SecurityRulePresenter {
  parseIntrusionRuleInsertion(obj: object): IntrusionRuleInsertion {
    return intrusionRuleInsertionSchema.parse(obj)
  }

  parseRangeRuleInsertion(obj: object): RangeRuleInsertion {
    return rangeRuleInsertionSchema.parse(obj)
  }

  parseIntrusionRuleUpdate(obj: object): IntrusionRuleUpdate {
    return intrusionRuleUpdateSchema.parse(obj)
  }

  parseRangeRuleUpdate(obj: object): RangeRuleUpdate {
    return rangeRuleUpdateSchema.parse(obj)
  }
}

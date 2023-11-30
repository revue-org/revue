import { IntrusionRule } from '../core/IntrusionRule'
import { ExceedingRule } from '../core/ExceedingRule'

export interface SecurityRuleFactory {
  createIntrusionRule(): IntrusionRule

  createExceedingRule(): ExceedingRule
}

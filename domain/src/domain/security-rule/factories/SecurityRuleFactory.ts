import { IntrusionRule } from '../core/IntrusionRule.js'
import { ExceedingRule } from '../core/ExceedingRule.js'

export interface SecurityRuleFactory {
  createIntrusionRule(): IntrusionRule

  createExceedingRule(): ExceedingRule
}

import { IntrusionRule } from '../core/IntrusionRule'
import { ExceedingRule } from '../core/ExceedingRule'
export interface AnomalyFactory {
  createIntrusion(): IntrusionRule
  createExceeding(): ExceedingRule
}

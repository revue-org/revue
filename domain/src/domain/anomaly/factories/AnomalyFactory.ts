import { Intrusion } from '../core/Intrusion.js'
import { Exceeding } from '../core/Exceeding.js'

export interface AnomalyFactory {
  createIntrusion(): Intrusion

  createExceeding(): Exceeding
}

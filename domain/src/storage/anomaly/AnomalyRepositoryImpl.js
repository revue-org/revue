import { exceedingModel } from '../security-rule/schemas/ExceedingRuleSchema.js'
import { intrusionModel } from '../security-rule/schemas/IntrusionRuleSchema.js'

class AnomalyRepositoryImpl {
  getAnomalies() {
    return this.getExceedings() && this.getIntrusions()
  }

  getExceedings() {
    return exceedingModel.find()
  }

  getIntrusions() {
    return intrusionModel.find()
  }

  insertAnomaly(anomaly) {}

  deleteAnomaly(anomalyId) {}
}

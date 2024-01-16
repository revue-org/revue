import { exceedingModel } from '../security-rule/schemas/ExceedingRule.js'
import { intrusionModel } from '../security-rule/schemas/IntrusionRule.js'

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

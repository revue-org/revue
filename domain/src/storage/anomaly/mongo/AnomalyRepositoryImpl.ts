import { exceedingModel } from '../../security-rule/mongo/schemas/ExceedingRule.js'
import { Exceeding } from '../../../domain/anomaly/core/Exceeding.js'
import { intrusionModel } from '../../security-rule/mongo/schemas/IntrusionRule.js'
import { Anomaly } from '../../../domain/anomaly/core/Anomaly.js'
import { Intrusion } from '../../../domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from '../../../domain/anomaly/repositories/AnomalyRepository.js'

class AnomalyRepositoryImpl implements AnomalyRepository {
  getAnomalies(): Set<Anomaly> {
    return this.getExceedings() && this.getIntrusions()
  }

  getExceedings(): Set<Exceeding> {
    return exceedingModel.find()
  }

  getIntrusions(): Set<Intrusion> {
    return intrusionModel.find()
  }

  insertAnomaly(anomaly: Anomaly): void {}

  deleteAnomaly(anomalyId: number): void {}
}

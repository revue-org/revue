import { exceedingModel } from '../../security-rule/mongo/schemas/ExceedingRule'
import { Exceeding } from '../../../domain/anomaly/core/Exceeding'
import { intrusionModel } from '../../security-rule/mongo/schemas/IntrusionRule'
import { Anomaly } from '../../../domain/anomaly/core/Anomaly'
import { Intrusion } from '../../../domain/anomaly/core/Intrusion'
import { AnomalyRepository } from '../../../domain/anomaly/repositories/AnomalyRepository'

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

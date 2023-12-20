import { Model } from 'mongoose'
import { Exceeding } from '../../domain/anomaly/core/Exceeding.js'
import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'
import { Intrusion } from '../../domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from '../../domain/anomaly/repositories/AnomalyRepository.js'

class AnomalyRepositoryImpl implements AnomalyRepository {
  exceedingModel: Model<Exceeding>
  intrusionModel: Model<Intrusion>
  anomalySchema: Model<Anomaly>

  constructor(
    exceedingModel: Model<Exceeding>,
    intrusionModel: Model<Intrusion>,
    anomalySchema: Model<Anomaly>
  ) {
    this.exceedingModel = exceedingModel
    this.intrusionModel = intrusionModel
    this.anomalySchema = anomalySchema
  }

  async getExceedings(): Promise<Array<Exceeding>> {
    return this.exceedingModel.find()
  }

  async getIntrusions(): Promise<Array<Intrusion>> {
    return this.intrusionModel.find()
  }

  async getAnomaly(anomalyId: number): Promise<Exceeding | Intrusion | null> {
    throw new Error('Method not implemented.')
    //return this.anomalySchema.findById({ anomalyId }).orFail()
  }

  async insertAnomaly(anomaly: Anomaly): Promise<void> {}

  async updateAnomaly(anomaly: Anomaly): Promise<void> {}

  async deleteAnomaly(anomalyId: number): Promise<void> {}
}

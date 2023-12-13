import { Model } from 'mongoose'
import { Exceeding } from '../../domain/anomaly/core/Exceeding.js'
import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'
import { Intrusion } from '../../domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from '../../domain/anomaly/repositories/AnomalyRepository.js'
import { ExceedingImpl } from '../../domain/anomaly/core/impl/ExceedingImpl'
import { IntrusionImpl } from '../../domain/anomaly/core/impl/IntrusionImpl'

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

  async getAnomaly(anomalyId: number): Promise<Exceeding | Intrusion> {
    const exceeding = await this.exceedingModel.findById(anomalyId)
    if (exceeding) {
      return exceeding
    }
    const intrusion = await this.intrusionModel.findById(anomalyId)
    if (intrusion) {
      return intrusion
    }
    throw new Error('Anomaly not found')
  }

  async insertAnomaly(anomaly: Anomaly): Promise<void> {
    switch (typeof anomaly) {
      case typeof ExceedingImpl:
        await this.exceedingModel.create({
          _id: anomaly.anomalyId,
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          value: (anomaly as ExceedingImpl).value,
          measure: (anomaly as ExceedingImpl).measure
        })
        break
      case typeof IntrusionImpl:
        await this.intrusionModel.create({
          _id: anomaly.anomalyId,
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          intrusionObject: (anomaly as IntrusionImpl).intrusionObject
        })
        break
    }
  }

  async updateAnomaly(anomaly: Anomaly): Promise<void> {
    switch (typeof anomaly) {
      case typeof ExceedingImpl:
        await this.exceedingModel.findByIdAndUpdate(anomaly.anomalyId, {
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          value: (anomaly as ExceedingImpl).value,
          measure: (anomaly as ExceedingImpl).measure
        })
        break
      case typeof IntrusionImpl:
        await this.intrusionModel.findByIdAndUpdate(anomaly.anomalyId, {
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          intrusionObject: (anomaly as IntrusionImpl).intrusionObject
        })
        break
    }
  }

  async deleteAnomaly(anomalyId: number): Promise<void> {
    //TODO TO TEST
    await this.anomalySchema.findByIdAndDelete(anomalyId)
  }
}

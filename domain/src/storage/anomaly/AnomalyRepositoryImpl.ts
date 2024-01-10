import mongoose, { Model, Types } from "mongoose";
import { Exceeding } from '../../domain/anomaly/core/Exceeding.js'
import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'
import { Intrusion } from '../../domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from '../../domain/anomaly/repositories/AnomalyRepository.js'
import { ExceedingImpl } from '../../domain/anomaly/core/impl/ExceedingImpl.js'
import { IntrusionImpl } from '../../domain/anomaly/core/impl/IntrusionImpl.js'

export class AnomalyRepositoryImpl implements AnomalyRepository {
  exceedingModel: Model<Exceeding>
  intrusionModel: Model<Intrusion>

  constructor(exceedingModel: Model<Exceeding>, intrusionModel: Model<Intrusion>) {
    this.exceedingModel = exceedingModel
    this.intrusionModel = intrusionModel
  }

  async getExceedings(): Promise<Exceeding[]> {
    return this.exceedingModel.find().orFail()
  }

  async getIntrusions(): Promise<Intrusion[]> {
    return this.intrusionModel.find().orFail()
  }

  async getAnomalyById(anomalyId: string): Promise<Exceeding | Intrusion> {
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
        }).catch((err) => {
        throw err
      })
        break
      case typeof IntrusionImpl:
        console.log("ci sono su int impl")
        await this.intrusionModel.create({
          _id: anomaly.anomalyId,
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          intrusionObject: (anomaly as IntrusionImpl).intrusionObject
        }).catch((err) => {
        throw err
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

  async deleteAnomaly(anomalyId: string): Promise<void> {
    //devo passare anche il tipo in modo da sapere che modello usare per
    //eliminare il record su mongo db
    await this.intrusionModel.deleteOne({ _id: new mongoose.Types.ObjectId(anomalyId) })
    await this.exceedingModel.deleteOne({ _id: new mongoose.Types.ObjectId(anomalyId) })
  }
}

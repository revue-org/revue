import mongoose, { Model } from 'mongoose'
import { Exceeding } from '../../domain/anomaly/core/Exceeding.js'
import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'
import { Intrusion } from '../../domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from '../../domain/anomaly/repositories/AnomalyRepository.js'
import { ExceedingImpl } from '../../domain/anomaly/core/impl/ExceedingImpl.js'
import { IntrusionImpl } from '../../domain/anomaly/core/impl/IntrusionImpl.js'
import { ObjectClassConverter } from "../../utils/ObjectClassConverter.js";
import { MeasureConverter } from "../../utils/MeasureConverter.js";
import { AnomalyType } from "../../domain/anomaly/core/impl/enum/AnomalyType.js";

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
    if (anomaly instanceof ExceedingImpl) {
      await this.exceedingModel
        .create({
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          value: (anomaly as ExceedingImpl).value,
          measure: MeasureConverter.convertToString((anomaly as ExceedingImpl).measure)
        })
        .catch((err): void => {
          throw err
        })
    }
    if (anomaly instanceof IntrusionImpl) {
      await this.intrusionModel
        .create({
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          intrusionObject: ObjectClassConverter.convertToString((anomaly as IntrusionImpl).intrusionObject)
        })
        .catch((err): void => {
          throw err
        })
    }
  }

  async updateAnomaly(anomaly: Anomaly): Promise<void> {
    if(anomaly instanceof ExceedingImpl) {
      await this.exceedingModel.findByIdAndUpdate(anomaly.anomalyId, {
        deviceId: {
          type: anomaly.deviceId.type,
          code: anomaly.deviceId.code
        },
        timestamp: anomaly.timestamp,
        value: (anomaly as ExceedingImpl).value,
        measure: MeasureConverter.convertToString((anomaly as ExceedingImpl).measure)
      })
    }
    if (anomaly instanceof IntrusionImpl) {
        await this.intrusionModel.findByIdAndUpdate(anomaly.anomalyId, {
          deviceId: {
            type: anomaly.deviceId.type,
            code: anomaly.deviceId.code
          },
          timestamp: anomaly.timestamp,
          intrusionObject: ObjectClassConverter.convertToString((anomaly as IntrusionImpl).intrusionObject)
        })
    }
  }

  async deleteAnomaly(anomalyId: string, type: AnomalyType): Promise<void> {
    switch (type) {
      case AnomalyType.EXCEEDING:
        await this.exceedingModel.deleteOne({ _id: new mongoose.Types.ObjectId(anomalyId) })
        break;
      case AnomalyType.INTRUSION:
        await this.intrusionModel.deleteOne({ _id: new mongoose.Types.ObjectId(anomalyId) })
        break;
    }
  }
}

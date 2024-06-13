import mongoose from 'mongoose'
import { AnomalyRepository } from '@/application/repositories/AnomalyRepository'
import { AnomalyDBAdapter, AnomalyDBEntity } from '@/infrastructure/storage/models/AnomalyModel'
import { Outlier } from '@common/domain/core/Outlier'
import { Intrusion } from '@common/domain/core/Intrusion'
import { DomainEventId } from '@common/domain/core/DomainEventId'
import { anomalySchema } from '@/infrastructure/storage/AnomalySchema'
import { Anomaly } from '@common/domain/core/Anomaly'

export class MongoDBAnomalyRepository implements AnomalyRepository {
  private _model = mongoose.model<AnomalyDBEntity>('AnomalySchema', anomalySchema)

  async getOutliers(): Promise<Outlier[]> {
    const outliers = await this._model
      .find({
        type: 'outlier'
      })
      .lean()
    return outliers.map(outlier => AnomalyDBAdapter.asDomainEntity(outlier) as Outlier)
  }

  async getIntrusions(): Promise<Intrusion[]> {
    const intrusions = await this._model
      .find({
        type: 'intrusion'
      })
      .lean()
    return intrusions.map(intrusion => AnomalyDBAdapter.asDomainEntity(intrusion) as Intrusion)
  }

  async getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly> {
    const anomaly = await this._model
      .findOne({
        id: anomalyId.id
      })
      .lean()
    if (!anomaly) {
      throw new Error('Anomaly not found')
    }
    return AnomalyDBAdapter.asDomainEntity(anomaly)
  }

  async getAnomalies(): Promise<Anomaly[]> {
    return this._model
      .find()
      .lean()
      .then(anomalies => {
        return anomalies.map(anomaly => AnomalyDBAdapter.asDomainEntity(anomaly))
      })
  }

  async saveAnomaly(anomaly: Anomaly): Promise<void> {
    await this._model.create(AnomalyDBAdapter.asDBEntity(anomaly))
  }

  async updateAnomaly(anomaly: Anomaly): Promise<void> {
    await this._model.updateOne(
      {
        id: anomaly.id.id
      },
      AnomalyDBAdapter.asDBEntity(anomaly)
    )
  }

  async removeAnomaly(anomalyId: DomainEventId): Promise<void> {
    await this._model.deleteOne({ id: anomalyId.id })
  }
}

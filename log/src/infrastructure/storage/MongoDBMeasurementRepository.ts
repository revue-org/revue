import mongoose from 'mongoose'
import { Measurement } from 'common/dist/domain/core/Measurement'
import { MeasurementRepository } from '@/application/repositories/MeasurementRepository'
import { DomainEventId } from 'common/dist/domain/core/DomainEventId'
import {
  NumericMeasurementDBAdapter,
  NumericMeasurementDBEntity
} from '@/infrastructure/storage/models/NumericMeasurementModel'
import { numericMeasurementSchema } from '@/infrastructure/storage/schemas/NumericMeasurementSchema'

export class MongoDBMeasurementRepository implements MeasurementRepository {
  private _model = mongoose.model<NumericMeasurementDBEntity>(
    'NumericMeasurementSchema',
    numericMeasurementSchema,
    'numericMeasurements'
  )

  async getMeasurements(): Promise<Measurement[]> {
    const measurements = await this._model.find().lean()
    return measurements.map(measurement => NumericMeasurementDBAdapter.asDomainEntity(measurement))
  }

  async getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]> {
    const measurements = await this._model
      .find({
        sourceDeviceId: deviceId
      })
      .limit(quantity)
      .lean()
    return measurements.map(measurement => NumericMeasurementDBAdapter.asDomainEntity(measurement))
  }

  async saveMeasurement(measurement: Measurement): Promise<void> {
    await this._model.create(NumericMeasurementDBAdapter.asDBEntity(measurement))
  }

  async updateMeasurement(measurement: Measurement): Promise<void> {
    await this._model.updateOne(
      {
        id: measurement.id.value
      },
      NumericMeasurementDBAdapter.asDBEntity(measurement)
    )
  }

  async removeMeasurement(measurementId: DomainEventId): Promise<void> {
    await this._model.deleteOne({ id: measurementId.value })
  }
}

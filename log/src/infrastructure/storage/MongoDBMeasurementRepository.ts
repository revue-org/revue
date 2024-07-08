import mongoose from 'mongoose'
import { Measurement } from 'common/dist/domain/core/Measurement'
import { MeasurementRepository } from '@/application/repositories/MeasurementRepository'
import { DomainEventId } from 'common/dist/domain/core/DomainEventId'
import { NumericMeasurementDBEntity } from '@/infrastructure/storage/models/NumericMeasurementModel'
import { NumericMeasurementDBAdapter } from '@/infrastructure/storage/models/NumericMeasurementModel.js'
import { numericMeasurementSchema } from '@/infrastructure/storage/schemas/NumericMeasurementSchema.js'

export class MongoDBMeasurementRepository implements MeasurementRepository {
  private model = mongoose.model<NumericMeasurementDBEntity>(
    'NumericMeasurementSchema',
    numericMeasurementSchema,
    'numericMeasurement'
  )

  async getMeasurements(): Promise<Measurement[]> {
    const measurements = await this.model.find().lean()
    return measurements.map(measurement => NumericMeasurementDBAdapter.asDomainEntity(measurement))
  }

  async getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]> {
    const measurements = await this.model
      .find({
        sourceDeviceId: deviceId
      })
      .limit(quantity)
      .lean()
    return measurements.map(measurement => NumericMeasurementDBAdapter.asDomainEntity(measurement))
  }

  async saveMeasurement(measurement: Measurement): Promise<void> {
    await this.model.create(NumericMeasurementDBAdapter.asDBEntity(measurement))
  }

  async updateMeasurement(measurement: Measurement): Promise<void> {
    await this.model.updateOne(
      {
        id: measurement.id.value
      },
      NumericMeasurementDBAdapter.asDBEntity(measurement)
    )
  }

  async removeMeasurement(measurementId: DomainEventId): Promise<void> {
    await this.model.deleteOne({ id: measurementId.value })
  }
}

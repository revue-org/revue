import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { AnomalyDBEntity } from '@/infrastructure/storage/models/AnomalyModel'
import { anomalySchema } from '@/infrastructure/storage/schemas/AnomalySchema'
import { NumericMeasurementDBEntity } from '@/infrastructure/storage/models/NumericMeasurementModel'
import { numericMeasurementSchema } from '@/infrastructure/storage/schemas/NumericMeasurementSchema'
import { intrusionSample, measurementSample, outlierSample } from '../resources/dataSample'

let mongoMock: any = null

export const connectToMock = async (): Promise<void> => {
  mongoMock = await MongoMemoryServer.create()
  await mongoose.connect(mongoMock.getUri(), {
    directConnection: true
  })
}

export const disconnectFromMock = async (): Promise<void> => {
  await mongoose.connection.close()
  if (mongoMock) {
    await mongoMock.stop()
  }
}

export const populateLog = async (): Promise<void> => {
  const modelAnomalies = mongoose.model<AnomalyDBEntity>('AnomalySchema', anomalySchema, 'anomaly')
  const modelMeasurements = mongoose.model<NumericMeasurementDBEntity>(
    'NumericMeasurementSchema',
    numericMeasurementSchema,
    'numericMeasurements'
  )
  await modelAnomalies.create(intrusionSample)
  await modelAnomalies.create(outlierSample)
  await modelMeasurements.create(measurementSample)
}

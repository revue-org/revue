
export interface MeasurementRepository {

  getMeasurements(): Promise<Measurement[]>

  getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement>

  saveMeasurement(measurement: Measurement): Promise<void>

  updateMeasurement(measurement: Measurement): Promise<void>

  removeMeasurement(measurementId: MeasurementId): Promise<void>

}

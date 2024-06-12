
export interface MeasurementService {
  getMeasurements(): Promise<Measurement[]>

  getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]>

  createMeasurement(measurement: Measurement): void

  updateMeasurement(measurementId: Measurement): void

  removeMeasurement(measurementId: MeasurementId): void
}

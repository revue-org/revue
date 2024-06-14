export interface AlarmEventsManager {
  sendAnomalyDetection(): void

  setNewMeasurementHandler(handler: (measurement: Measurment) => void): void

  setNewDetectionHandler(handler: (detection: Detection) => void): void
}

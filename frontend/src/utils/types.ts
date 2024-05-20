import { type EnvironmentData, Measure, type Sensor } from '@domain/device/core'

export type SensorMeasures = { sensor: Sensor; measures: { measure: Measure; data: EnvironmentData[] }[] }

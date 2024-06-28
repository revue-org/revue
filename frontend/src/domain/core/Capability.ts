import { MeasureType } from "common/dist/domain/core";

export enum CapabilityType {
  SENSOR = 'sensor',
  VIDEO = 'video'
}

export type Capability = SensoringCapability | VideoStreamingCapability

export type SensoringCapability = {
  type: CapabilityType.SENSOR
  capturingInterval: string
  measure: {
    type: MeasureType
    unit: string
  }
}

export type VideoStreamingCapability = {
  type: CapabilityType.VIDEO
  resolution: string
}
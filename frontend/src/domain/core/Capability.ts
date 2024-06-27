import { MeasureType } from "common/dist/domain/core";

export type Capability = SensoringCapability | VideoStreamingCapability

export type SensoringCapability = {
  type: 'sensor'
  capturingInterval: string
  measure: {
    type: MeasureType
    unit: string
  }
}

export type VideoStreamingCapability = {
  type: 'video'
  resolution: string
}
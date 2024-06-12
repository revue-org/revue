import { AnomalyId } from "@/domain/core/AnomalyId";

export type AnomalyType = 'outlier' | 'intrusion'

export interface Anomaly {
  get id(): AnomalyId

  get type(): AnomalyType

  get sourceDeviceId(): string

  get timestamp(): Date
}

import { Anomaly } from '@common/domain/core/Anomaly.js'
import { Outlier } from '@common/domain/core/Outlier.js'
import { Intrusion } from '@common/domain/core/Intrusion.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { Detection, Measurement } from '@common/domain/core'

export interface AnomalyService {
  getAnomalies(): Promise<Anomaly[]>

  getOutliers(limit: number): Promise<Outlier[]>

  getIntrusions(limit: number): Promise<Intrusion[]>

  getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly>

  createOutlier(timestamp: Date, measurement: Measurement, rangeRuleId: string): Promise<void>

  createIntrusion(timestamp: Date, detection: Detection, intrusionRuleId: string): Promise<void>

  deleteAnomaly(anomalyId: DomainEventId): Promise<void>
}

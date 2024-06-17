import { Anomaly } from '@common/domain/core/Anomaly.js'
import { Outlier } from '@common/domain/core/Outlier.js'
import { Intrusion } from '@common/domain/core/Intrusion.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'

export interface AnomalyService {
  getAnomalies(): Promise<Anomaly[]>

  getOutliers(): Promise<Outlier[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly>

  createOutlier(timestamp: Date, measurementId: DomainEventId, rangeRuleId: string): Promise<void>

  createIntrusion(timestamp: Date, detectionId: DomainEventId, intrusionRuleId: string): Promise<void>

  deleteAnomaly(anomalyId: DomainEventId): Promise<void>
}

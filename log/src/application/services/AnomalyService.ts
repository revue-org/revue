import { Anomaly } from '@common/domain/core/Anomaly.js'
import { Outlier } from '@common/domain/core/Outlier.js'
import { Intrusion } from '@common/domain/core/Intrusion.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { DomainEvent } from '@common/domain/core/DomainEvent.js'

export interface AnomalyService {
  getAnomalies(): Promise<Anomaly[]>

  getOutliers(): Promise<Outlier[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly>

  createOutlier(timestamp: Date, measurement: DomainEvent, rangeRuleId: string): Promise<void>

  createIntrusion(timestamp: Date, detection: DomainEvent, intrusionRuleId: string): Promise<void>

  deleteAnomaly(anomalyId: DomainEventId): Promise<void>
}

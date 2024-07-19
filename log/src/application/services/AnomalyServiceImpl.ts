import { AnomalyService } from '@/application/services/AnomalyService.js'
import { AnomalyRepository } from '@/application/repositories/AnomalyRepository.js'
import { Anomaly } from '@common/domain/core/Anomaly.js'
import { Intrusion } from '@common/domain/core/Intrusion.js'
import { Outlier } from '@common/domain/core/Outlier.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { AnomalyFactory } from 'common/dist/domain/factories/AnomalyFactory.js'
import { LogEventsHub } from '@/application/services/LogEventsHub.js'
import { Detection, Measurement } from '@common/domain/core'

export class AnomalyServiceImpl implements AnomalyService {
  private readonly repository: AnomalyRepository
  private readonly events: LogEventsHub

  constructor(repository: AnomalyRepository, events: LogEventsHub) {
    this.repository = repository
    this.events = events
    if (process.env.NODE_ENV !== 'test') {
      this.configureEvents()
    }
  }

  private configureEvents(): void {
    this.events.subscribeToAnomalies((anomaly: Anomaly): void => {
      this.repository.saveAnomaly(anomaly)
    })
  }

  async getAnomalies(): Promise<Anomaly[]> {
    return this.repository.getAnomalies()
  }

  async getIntrusions(limit: number): Promise<Intrusion[]> {
    return this.repository.getIntrusions(limit)
  }

  async getOutliers(limit: number): Promise<Outlier[]> {
    return this.repository.getOutliers(limit)
  }

  async getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly> {
    return this.repository.getAnomalyById(anomalyId)
  }

  async createIntrusion(timestamp: Date, detection: Detection, intrusionRuleId: string): Promise<void> {
    await this.repository.saveAnomaly(AnomalyFactory.createIntrusion(timestamp, detection, intrusionRuleId))
  }

  async createOutlier(timestamp: Date, measurement: Measurement, rangeRuleId: string): Promise<void> {
    await this.repository.saveAnomaly(AnomalyFactory.createOutlier(timestamp, measurement, rangeRuleId))
  }

  async deleteAnomaly(anomalyId: DomainEventId): Promise<void> {
    await this.repository.removeAnomaly(anomalyId)
  }
}

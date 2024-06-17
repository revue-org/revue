import { AnomalyService } from '@/application/services/AnomalyService.js'
import { AnomalyRepository } from '@/application/repositories/AnomalyRepository.js'
import { Anomaly } from '@common/domain/core/Anomaly.js'
import { Intrusion } from '@common/domain/core/Intrusion.js'
import { Outlier } from '@common/domain/core/Outlier.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { AnomalyFactory } from 'common/dist/domain/factories/AnomalyFactory'

export class AnomalyServiceImpl implements AnomalyService {
  private repository: AnomalyRepository

  constructor(repository: AnomalyRepository) {
    this.repository = repository
  }

  async getAnomalies(): Promise<Anomaly[]> {
    return this.repository.getAnomalies()
  }

  async getIntrusions(): Promise<Intrusion[]> {
    return this.repository.getIntrusions()
  }

  async getOutliers(): Promise<Outlier[]> {
    return this.repository.getOutliers()
  }

  async getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly> {
    return this.repository.getAnomalyById(anomalyId)
  }

  async createIntrusion(timestamp: Date, detectionId: DomainEventId, intrusionRuleId: string): Promise<void> {
    await this.repository.saveAnomaly(
      AnomalyFactory.createIntrusion(AnomalyFactory.newId(), timestamp, detectionId, intrusionRuleId)
    )
  }

  async createOutlier(timestamp: Date, measurementId: DomainEventId, rangeRuleId: string): Promise<void> {
    await this.repository.saveAnomaly(
      AnomalyFactory.createOutlier(AnomalyFactory.newId(), timestamp, measurementId, rangeRuleId)
    )
  }

  async deleteAnomaly(anomalyId: DomainEventId): Promise<void> {
    await this.repository.removeAnomaly(anomalyId)
  }
}

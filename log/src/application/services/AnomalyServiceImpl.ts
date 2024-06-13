import { AnomalyService } from '@/application/services/AnomalyService.js'
import { AnomalyRepository } from '@/application/repositories/AnomalyRepository.js'
import { Anomaly } from '@common/domain/core/Anomaly.js'
import { Intrusion } from '@common/domain/core/Intrusion.js'
import { Outlier } from '@common/domain/core/Outlier.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'

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

  async createIntrusion(intrusion: Intrusion): Promise<void> {
    await this.repository.saveAnomaly(intrusion)
  }

  async createOutlier(outlier: Outlier): Promise<void> {
    await this.repository.saveAnomaly(outlier)
  }

  async updateIntrusion(intrusion: Intrusion): Promise<void> {
    await this.repository.updateAnomaly(intrusion)
  }

  async updateOutlier(outlier: Outlier): Promise<void> {
    await this.repository.updateAnomaly(outlier)
  }

  async deleteAnomaly(anomalyId: DomainEventId): Promise<void> {
    await this.repository.removeAnomaly(anomalyId)
  }
}

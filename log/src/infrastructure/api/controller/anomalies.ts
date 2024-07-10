import { Anomaly } from '@common/domain/core/Anomaly'
import { Outlier } from '@common/domain/core/Outlier'
import { AnomalyFactory } from '@common/domain/factories/AnomalyFactory.js'
import { Intrusion } from '@common/domain/core/Intrusion'
import { DomainEventId } from '@common/domain/core/DomainEventId'
import { anomalyService } from '@/setup.js'

export const anomalyController = {
  getAnomalyById: async (id: string): Promise<Anomaly> => {
    return anomalyService.getAnomalyById(AnomalyFactory.idOf(id))
  },
  getOutliers: async (): Promise<Outlier[]> => {
    return await anomalyService.getOutliers()
  },
  getIntrusions: async (): Promise<Intrusion[]> => {
    return await anomalyService.getIntrusions()
  },
  deleteAnomaly: async (id: DomainEventId): Promise<void> => {
    await anomalyService.deleteAnomaly(id)
  }
}

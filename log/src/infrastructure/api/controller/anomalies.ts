import { MongoDBAnomalyRepository } from '@/infrastructure/storage/MongoDBAnomalyRepository'
import { AnomalyServiceImpl } from '@/application/services/AnomalyServiceImpl'
import { AnomalyService } from '@/application/services/AnomalyService'
import { Anomaly } from '@common/domain/core/Anomaly'
import { Outlier } from '@common/domain/core/Outlier'
import { AnomalyFactory } from '@common/domain/factories/AnomalyFactory'
import { Intrusion } from '@common/domain/core/Intrusion'
import { DomainEventId } from '@common/domain/core/DomainEventId'

const service: AnomalyService = new AnomalyServiceImpl(new MongoDBAnomalyRepository())

export const anomalyController = {
  getAnomalyById: async (id: string): Promise<Anomaly> => {
    return service.getAnomalyById(AnomalyFactory.idOf(id))
  },
  getOutliers: async (): Promise<Outlier[]> => {
    return await service.getOutliers()
  },
  getIntrusions: async (): Promise<Intrusion[]> => {
    return await service.getIntrusions()
  },
  deleteAnomaly: async (id: DomainEventId): Promise<void> => {
    await service.deleteAnomaly(id)
  }
}

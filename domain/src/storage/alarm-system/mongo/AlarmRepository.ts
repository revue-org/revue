import { RecognizingNode } from '../../../domain/alarm-system/core/RecognizingNode'

export interface AlarmRepository {
  getAnomalies(): Set<RecognizingNode>

  insertAnomaly(anomaly: RecognizingNode): void

  deleteAnomaly(anomalyId: number): void
}

import { AlarmService } from '../../../application/alarm-system/AlarmService'

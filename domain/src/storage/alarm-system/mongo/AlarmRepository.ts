import { RecognizingNode } from '../../../domain/alarm-system/core/RecognizingNode.js'

export interface AlarmRepository {
  getAnomalies(): Set<RecognizingNode>

  insertAnomaly(anomaly: RecognizingNode): void

  deleteAnomaly(anomalyId: number): void
}

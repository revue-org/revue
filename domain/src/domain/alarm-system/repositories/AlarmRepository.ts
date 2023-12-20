import { RecognizingNode } from '../core/RecognizingNode.js'

export interface AlarmRepository {
  getAnomalies(): Set<RecognizingNode>

  insertAnomaly(anomaly: RecognizingNode): void

  deleteAnomaly(anomalyId: number): void
}

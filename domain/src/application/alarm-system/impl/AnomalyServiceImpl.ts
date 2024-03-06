import { Anomaly } from '../../../domain/alarm-system/core/Anomaly.js'
import { AnomalyService } from '../AnomalyService.js'
import { Exceeding } from '../../../domain/alarm-system/core/Exceeding.js'
import { Intrusion } from '../../../domain/alarm-system/core/Intrusion.js'
import { AnomalyRepository } from '../../../domain/alarm-system/repositories/AnomalyRepository.js'
import { AnomalyType } from '../../../domain/alarm-system/core/impl/enum/AnomalyType.js'

export class AnomalyServiceImpl implements AnomalyService {
  private anomalyRepository: AnomalyRepository
  private anomalies: Anomaly[] = []

  constructor(anomalyRepository: AnomalyRepository) {
    this.anomalyRepository = anomalyRepository
  }

  getExceedings(): Promise<Exceeding[]> {
    return this.anomalyRepository.getExceedings()
  }

  getIntrusions(): Promise<Intrusion[]> {
    return this.anomalyRepository.getIntrusions()
  }

  getAnomalyById(anomalyId: string): Promise<Anomaly> {
    return this.anomalyRepository.getAnomalyById(anomalyId)
  }

  insertExceeding(exceeding: Exceeding): Promise<string> {
    return this.anomalyRepository.insertExceeding(exceeding)
  }

  insertIntrusion(intrusion: Intrusion): Promise<string> {
    return this.anomalyRepository.insertIntrusion(intrusion)
  }

  updateExceeding(exceeding: Exceeding): void {
    this.anomalyRepository.updateExceeding(exceeding).then((): void => {
      this.anomalies = this.anomalies.map(
        (anomaly: Anomaly): Anomaly => (anomaly.anomalyId === exceeding.anomalyId ? exceeding : anomaly)
      )
    })
  }

  updateIntrusion(intrusion: Intrusion): void {
    this.anomalyRepository.updateIntrusion(intrusion).then((): void => {
      this.anomalies = this.anomalies.map(
        (anomaly: Anomaly): Anomaly => (anomaly.anomalyId === intrusion.anomalyId ? intrusion : anomaly)
      )
    })
  }

  deleteAnomaly(anomalyId: string, type: AnomalyType): void {
    this.anomalyRepository.deleteAnomaly(anomalyId, type).then((): void => {
      this.anomalies = this.anomalies.filter((anomaly: Anomaly): boolean => anomaly.anomalyId !== anomalyId)
    })
  }

  notifyNotificationService(anomaly: Anomaly): void {
    throw new Error('Method not implemented.')
  }

  sendNotification(anomaly: Anomaly): void {
    //i have to contact the user through the socket and by the requested method.
    console.log('DEVO MANDARE UNA MAIL')
    console.log(anomaly)
  }
}

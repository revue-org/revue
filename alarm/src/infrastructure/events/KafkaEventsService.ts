import { EventsService } from '@/application/services/EventsService'
import { Anomaly } from '@common/domain/core/Anomaly'
import { Detection } from '@common/domain/core/Detection'
import { Measurement } from '@common/domain/core/Measurement'

export class KafkaEventsService implements EventsService {

  constructor() {
    // this.eventsManager.setNewMeasurementHandler(async (measurement: Measurement) => {
    //   const rules: RangeRule[] = await this.getActiveRangeRules()
    //   rules.forEach((rule: RangeRule): void => {
    //     if (measurement.value < rule.min || measurement.value > rule.max) {
    //       this.eventsManager.sendAnomalyDetection()
    //     }
    //   })
    // })
    // this.eventsManager.setNewDetectionHandler(async detection => {
    //   const rules: IntrusionRule[] = await this.getActiveIntrusionRules()
    //   rules.forEach((rule: IntrusionRule): void => {
    //     if (detection.objectClass === rule.objectClass) {
    //       this.eventsManager.sendAnomalyDetection()
    //     }
    //   })
    // })
  }

  publishAnomaly(anomaly: Anomaly): void {
    throw new Error('Method not implemented.')
  }

  subscribeToMeasurements(handler: (measurement: Measurement) => void): void {
    throw new Error('Method not implemented.')
  }

  subscribeToDetections(handler: (detection: Detection) => void): void {
    throw new Error('Method not implemented.')
  }

}

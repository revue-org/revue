import { Anomaly } from "@/domain/core/Anomaly";
import { AnomalyFactory } from "@/domain/factories/AnomalyFactory";
import { Outlier } from "@/domain/core/Outlier";
import { Intrusion } from "@/domain/core/Intrusion";

export interface AnomalyDBEntity {
    id: string
    type: string
    sourceDeviceId: string
    timestamp: Date
    data: {
        measurementId?: string
        detectionId?: string
    }
}

export class AnomalyDBAdapter {

    static asDomainEntity(anomaly: AnomalyDBEntity): Anomaly {
        if (anomaly.type == 'outlier') {
            return AnomalyFactory.createOutlier(
              AnomalyFactory.idOf(anomaly.id),
              anomaly.sourceDeviceId,
              anomaly.timestamp,
              MeasurementFactory.idOf(anomaly.data.measurementId)
            )
        } else {
            return AnomalyFactory.createIntrusion(
                AnomalyFactory.idOf(anomaly.id),
              anomaly.sourceDeviceId,
                anomaly.timestamp,
                DetectionFactory.idOf(anomaly.data.detectionId)
            )
        }
    }

    static asDBEntity(anomaly: Anomaly): AnomalyDBEntity {
        if (anomaly.type == 'outlier') {
            const outlier: Outlier = anomaly as Outlier
            return {
                id: outlier.id.id,
                type: 'outlier',
                timestamp: outlier.timestamp,
                sourceDeviceId: outlier.sourceDeviceId,
                data: {
                    measurementId: outlier.measurementId.id
                }
            }
        } else {
            const intrusion: Intrusion = anomaly as Intrusion
            return {
                id: intrusion.id.id,
                type: 'intrusion',
                sourceDeviceId: intrusion.sourceDeviceId,
                timestamp: intrusion.timestamp,
                data: {
                    detectionId: intrusion.detectionId.id
                },
            }
        }
    }
}
import { Intrusion } from "@/domain/core/Intrusion.js";
import { Outlier } from "@/domain/core/Outlier.js";
import { AnomalyId } from "@/domain/core/AnomalyId";

export class AnomalyFactory {

  static newId(): AnomalyId {
    return {
      id: "test"
    }
  }

  static idOf(id: string): AnomalyId {
    return { id }
  }

  static createOutlier(
    id: AnomalyId,
    sourceDeviceId: string,
    timestamp: Date,
    measurementId: MeasurementId
  ): Outlier {
    return {
      id,
      type: "outlier",
      sourceDeviceId,
      timestamp,
      measurementId
    };
  }

  static createIntrusion(
    id: AnomalyId,
    sourceDeviceId: string,
    timestamp: Date,
    detectionId: DetectionId
  ): Intrusion {
    return {
      id,
      type: "intrusion",
      sourceDeviceId,
      timestamp,
      detectionId
    };
  }

}

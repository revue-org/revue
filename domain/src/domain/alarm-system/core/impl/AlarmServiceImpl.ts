import { Anomaly } from "../../../anomaly/core/Anomaly.js";
import { AnomalyService } from "../../../../application/anomaly/AnomalyService.js";
import { Error } from "mongoose";


export class AlarmServiceImpl implements AnomalyService {

  constructor() {
    throw new Error("TO BE implemented.");
  }

  addAnomaly(anomaly: Anomaly): void {
    throw new Error("TO BE implemented.");
  }

  notifyAlarmService(anomaly: Anomaly): void {
    throw new Error("TO BE implemented.");
  }

  removeAnomaly(anomalyId: string): void {
    throw new Error("TO BE implemented.");
  }
}
import { Anomaly } from "../../../anomaly/core/Anomaly";
import { AnomalyService } from "../../../../application/anomaly/AnomalyService";
import { DeviceId } from "../../../device/core/DeviceId";
import { Error } from "mongoose";


export class AlarmServiceImpl implements AnomalyService {
  /*startRecognizing(deviceId: DeviceId): void

  stopRecognizing(deviceId: DeviceId): void

  sendNotification(anomaly: Anomaly): void*/

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
import { Anomaly } from '../../../domain/anomaly/core/Anomaly.js'
import { AlarmService } from "../AlarmService.js";

export class AlarmServiceImpl implements AlarmService {
  constructor() {
    console.log("AlarmServiceImpl")
  }

  sendNotification(anomaly: Anomaly): void {
    //i have to contact the user through the socket and by the requested method.
    console.log("DEVO MANDARE UNA MAIL")
    console.log(anomaly)
  }
}

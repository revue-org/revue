import { Anomaly } from '../../domain/alarm-system/core/Anomaly.js'
import { SecurityRule } from "../../domain/alarm-system/core/SecurityRule.js";
import { Exceeding } from "../../domain/alarm-system/core/Exceeding.js";
import { Intrusion } from "../../domain/alarm-system/core/Intrusion.js";
import { AnomalyType } from "../../domain/alarm-system/core";

export interface AnomalyService {

  addAnomaly(anomaly: Anomaly): void

  removeAnomaly(anomalyId: string): void

  notifyAlarmService(anomaly: Anomaly): void

  addSecurityRule(securityRule: SecurityRule): void

  addSecurityRules(securityRules: SecurityRule[]): void

  updateExceeding(exceeding: Exceeding): void

  updateIntrusion(intrusion: Intrusion): void

  removeSecurityRule(securityRuleId: string): void

  getExceedings(): Exceeding[]

  getIntrusions(): Intrusion[]

  getAnomalyById(anomalyId: string): Anomaly

  insertExceeding(exceeding: Exceeding): string

  insertIntrusion(intrusion: Intrusion): string

  deleteAnomaly(anomalyId: string, type: AnomalyType): void

  sendNotification(anomaly: Anomaly): void
}

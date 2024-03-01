import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'
import { SecurityRule } from "../../domain/security-rule/core/SecurityRule.js";
import { Exceeding } from "../../domain/anomaly/core/Exceeding.js";
import { Intrusion } from "../../domain/anomaly/core/Intrusion.js";
import { AnomalyType } from "../../domain/anomaly/core";

export interface AlarmService {

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

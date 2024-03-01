import { Anomaly } from '../../../domain/alarm-system/core/Anomaly.js'
import { AnomalyService } from '../AnomalyService.js'
import { SecurityRule } from '../../../domain/alarm-system/core/SecurityRule.js'
import { Exceeding } from '../../../domain/alarm-system/core/Exceeding.js'
import { Intrusion } from '../../../domain/alarm-system/core/Intrusion.js'
import { AnomalyRepository } from '../../../domain/alarm-system/repositories/AnomalyRepository'
import { SecurityRuleRepository } from '../../../domain/alarm-system/repositories/SecurityRuleRepository'
import { NotificationRepository } from '../../../domain/notification/repositories/NotificationRepository'
import { RecognizingNodeRepository } from '../../../domain/alarm-system/repositories/RecognizingNodeRepository'
import { AnomalyType } from "../../../domain/alarm-system/core";
import { AnomalyRepositoryImpl } from "../../../storage/alarm-system/AnomalyRepositoryImpl";
import { Model } from "mongoose";

export class AnomalyServiceImpl implements AnomalyService {
  private anomalyRepository: AnomalyRepository

  private securityRules: SecurityRule[] = []

  constructor(
    exceedingModel: Model<Exceeding>,
    intrusionModel: Model<Intrusion>
  ) {
    this.anomalyRepository = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)
  }

  notifyNotificationService(anomaly: Anomaly): void {
    throw new Error('Method not implemented.')
  }

  addAnomaly(anomaly: Anomaly): void {
    throw new Error('Method not implemented.')
  }
  removeAnomaly(anomalyId: string): void {
    throw new Error('Method not implemented.')
  }
  notifyAlarmService(anomaly: Anomaly): void {
    throw new Error('Method not implemented.')
  }

  updateExceeding(securityRule: Exceeding): void {
    throw new Error('Method not implemented.')
  }
  updateIntrusion(securityRule: Intrusion): void {
    throw new Error('Method not implemented.')
  }

  updateSecurityRule(securityRule: SecurityRule): void {
    throw new Error('Method not implemented.')
  }

  getExceedings(): Exceeding[] {
    throw new Error('Method not implemented.')
  }

  getIntrusions(): Intrusion[] {
    throw new Error('Method not implemented.')
  }

  getAnomalyById(anomalyId: string): Anomaly {
    throw new Error('Method not implemented.')
  }

  insertExceeding(exceeding: Exceeding): string {
    throw new Error('Method not implemented.')
  }

  insertIntrusion(intrusion: Intrusion): string {
    throw new Error('Method not implemented.')
  }

  deleteAnomaly(anomalyId: string, type: AnomalyType): void {
    throw new Error('Method not implemented.')
  }

  sendNotification(anomaly: Anomaly): void {
    //i have to contact the user through the socket and by the requested method.
    console.log('DEVO MANDARE UNA MAIL')
    console.log(anomaly)
  }

  addSecurityRule(securityRule: SecurityRule): void {
    this.securityRules.push(securityRule)
  }

  addSecurityRules(securityRules: SecurityRule[]): void {
    this.securityRules.push(...securityRules)
  }

  removeSecurityRule(securityRuleId: string): void {
    this.securityRules = this.securityRules.filter(
      (rule: SecurityRule) => rule.securityRuleId !== securityRuleId
    )
  }
}

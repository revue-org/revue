import { Anomaly } from '../../../domain/anomaly/core/Anomaly.js'
import { AlarmService } from '../AlarmService.js'
import { SecurityRule } from '../../../domain/security-rule/core/SecurityRule.js'
import { Exceeding } from '../../../domain/anomaly/core/Exceeding.js'
import { Intrusion } from '../../../domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from '../../../domain/anomaly/repositories/AnomalyRepository'
import { SecurityRuleRepository } from '../../../domain/security-rule/repositories/SecurityRuleRepository'
import { NotificationRepository } from '../../../domain/alarm-system/repositories/NotificationRepository'
import { RecognizingNodeRepository } from '../../../domain/alarm-system/repositories/RecognizingNodeRepository'
import { AnomalyType } from "../../../domain/anomaly/core";

export class AlarmServiceImpl implements AlarmService {
  private anomalyRepository: AnomalyRepository
  private securityRuleRepository: SecurityRuleRepository
  private notificationRepository: NotificationRepository
  private recognizingNodeRepository: RecognizingNodeRepository

  private securityRules: SecurityRule[] = []

  constructor(
    anomalyRepository: AnomalyRepository,
    securityRuleRepository: SecurityRuleRepository,
    notificationRepository: NotificationRepository,
    recognizingNodeRepository: RecognizingNodeRepository
  ) {
    this.anomalyRepository = anomalyRepository
    this.securityRuleRepository = securityRuleRepository
    this.notificationRepository = notificationRepository
    this.recognizingNodeRepository = recognizingNodeRepository
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

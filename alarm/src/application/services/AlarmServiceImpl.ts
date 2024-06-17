import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRulesRepository } from '../repositories/SecurityRulesRepository'
import { AlarmService } from './AlarmService'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory'
import { Contact } from '@common/domain/core/Contact'
import { MeasureType } from '@common/domain/core/MeasureType'
import { ObjectClass } from '@/domain/core/ObjectClass'
import { AlarmEventsManager } from '@/infrastructure/events/AlarmEventsManager'
import { Measurement } from '@common/domain/core/Measurement'
import { Anomaly } from '@common/domain/core/Anomaly'

export class AlarmServiceImpl implements AlarmService {
  private repository: SecurityRulesRepository
  private eventsManager: AlarmEventsManager

  constructor(repository: SecurityRulesRepository, eventsManager: AlarmEventsManager) {
    this.repository = repository
    this.eventsManager = eventsManager

    this.eventsManager.setNewMeasurementHandler(async (measurement: Measurement) => {
      const rules: RangeRule[] = await this.getActiveRangeRules()
      rules.forEach((rule: RangeRule): void => {
        if (measurement.value < rule.min || measurement.value > rule.max) {
          this.eventsManager.sendAnomalyDetection()
        }
      })
    })

    this.eventsManager.setNewDetectionHandler(async detection => {
      const rules: IntrusionRule[] = await this.getActiveIntrusionRules()
      rules.forEach((rule: IntrusionRule): void => {
        if (detection.objectClass === rule.objectClass) {
          this.eventsManager.sendAnomalyDetection()
        }
      })
    })
  }

  async getRangeRules(): Promise<RangeRule[]> {
    return await this.repository.getRangeRules()
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    return await this.repository.getIntrusionRules()
  }

  async getSecurityRuleById(id: SecurityRuleId): Promise<SecurityRule> {
    return this.repository.getSecurityRuleById(id)
  }

  async createRangeRule(
    creatorId: string,
    activeOn: string,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    minValue: number,
    maxValue: number,
    measure: MeasureType
  ): Promise<SecurityRuleId> {
    const rule: RangeRule = SecurityRulesFactory.createRangeRule(
      SecurityRulesFactory.newId(),
      activeOn,
      creatorId,
      contacts,
      description,
      SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
      minValue,
      maxValue,
      measure,
      true
    )
    await this.repository.saveSecurityRule(rule)
    return rule.id
  }

  async createIntrusionRule(
    creatorId: string,
    activeOn: string,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    intrusionObject: ObjectClass
  ): Promise<SecurityRuleId> {
    const rule: IntrusionRule = SecurityRulesFactory.createIntrusionRule(
      SecurityRulesFactory.newId(),
      activeOn,
      creatorId,
      intrusionObject,
      contacts,
      description,
      SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
      true
    )
    await this.repository.saveSecurityRule(rule)
    return rule.id
  }

  updateRangeRule(
    rangeRuleId: SecurityRuleId,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    minValue: number,
    maxValue: number
  ): Promise<void> {
    return this.repository.getSecurityRuleById(rangeRuleId).then((rule: SecurityRule) => {
      const update = {
        ...(rule as RangeRule),
        description,
        contacts,
        validity: SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
        min: minValue,
        max: maxValue
      }
      this.repository.updateSecurityRule(update)
    })
  }

  updateIntrusionRule(
    intrusionRuleId: SecurityRuleId,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    intrusionObject: ObjectClass
  ): Promise<void> {
    return this.repository.getSecurityRuleById(intrusionRuleId).then((rule: SecurityRule) => {
      const update = {
        ...(rule as IntrusionRule),
        description,
        contacts,
        validity: SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
        objectClass: intrusionObject
      }
      this.repository.updateSecurityRule(update)
    })
  }

  async enableSecurityRule(id: SecurityRuleId): Promise<void> {
    await this.repository.enableSecurityRule(id)
  }

  async disableSecurityRule(id: SecurityRuleId): Promise<void> {
    await this.repository.disableSecurityRule(id)
  }

  async deleteSecurityRule(id: SecurityRuleId): Promise<void> {
    await this.repository.removeSecurityRule(id)
  }

  private async getActiveRules(): Promise<SecurityRule[]> {
    return this.repository
      .getSecurityRules()
      .then((rules: SecurityRule[]) =>
        rules
          .filter(rule => this.isEnabled(rule))
          .filter(rule => this.checkIfDateIsInRange(new Date(), rule.validity.from, rule.validity.to))
      )
  }

  private isEnabled(rule: SecurityRule): boolean {
    return rule.enabled
  }

  private async getActiveRangeRules(): Promise<RangeRule[]> {
    return this.getActiveRules().then(
      (rules: SecurityRule[]) => rules.filter(rule => rule.type === 'range') as RangeRule[]
    )
  }

  private async getActiveIntrusionRules(): Promise<IntrusionRule[]> {
    return this.getActiveRules().then(
      (rules: SecurityRule[]) => rules.filter(rule => rule.type === 'intrusion') as IntrusionRule[]
    )
  }

  private triggeredRulesFor(anomaly: Anomaly): Promise<SecurityRule[]> {
    // For Measurement or ObjectClass
    return this.getActiveRules().then((rules: SecurityRule[]) =>
      rules.filter(
        rule =>
          rule.activeOn === anomaly.deviceId &&
          this.checkIfDateIsInRange(anomaly.timestamp, rule.validity.from, rule.validity.to)
        // && check measure or objectClass
      )
    )
  }

  private extractContactsFrom(rules: SecurityRule[]): Contact[] {
    return [...new Set(rules.flatMap((rule: SecurityRule) => rule.contacts))]
  }

  private checkIfDateIsInRange = (date: Date, from: Date, to: Date): boolean => {
    date.setHours(date.getHours() + 1) // correction due to timezone
    return (
      (date.getHours() > from.getHours() ||
        (date.getHours() === from.getHours() && date.getMinutes() >= from.getMinutes())) &&
      (date.getHours() < to.getHours() ||
        (date.getHours() === to.getHours() && date.getMinutes() <= to.getMinutes()))
    )
  }
}

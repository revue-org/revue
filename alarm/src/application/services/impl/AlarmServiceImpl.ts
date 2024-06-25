import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRuleRepository } from '../../repositories/SecurityRuleRepository'
import { AlarmService } from '../AlarmService'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory.js'
import {
  Contact,
  Detection,
  DeviceEvent,
  Intrusion,
  Measure,
  Measurement,
  ObjectClass,
  Outlier
} from '@common/domain/core'
import { AlarmEventsHub } from '../AlarmEventsHub'
import RequestHelper, { deviceHost, devicePort } from '@/utils/RequestHelper.js'

export class AlarmServiceImpl implements AlarmService {
  private readonly _repository: SecurityRuleRepository
  private readonly _events: AlarmEventsHub

  constructor(repository: SecurityRuleRepository, events: AlarmEventsHub) {
    this._repository = repository
    this._events = events
    this.configureEvents()
  }

  private configureEvents(): void {
    this._events.subscribeToDetections((detection: Detection): void => {
      this.checkIntrusion(detection).then(intrusionRule => {
        if (intrusionRule) {
          this._events.publishAnomaly(this.createIntrusion(detection, intrusionRule))
        }
      })
    })

    this._events.subscribeToMeasurements((measurement: Measurement): void => {
      console.log('measurement', measurement)
      console.log('CHECK MEASUREMENT')
      this.checkMeasurement(measurement).then(rangeRule => {
        if (rangeRule) {
          this._events.publishAnomaly(this.createOutlier(measurement, rangeRule))
        }
      })
    })

    this._events.subscribeToDevices((event: DeviceEvent): void => {
      if (event.type === 'addition') {
        RequestHelper.get(`http://${deviceHost}:${devicePort}/${event.sourceDeviceId}/capabilities`).then(
          (res: any): void => {
            res.data.capabilities.forEach((capability: any): void => {
              if (capability.type === 'sensor') {
                this._events.addMeasurementTopics([`measurements.${event.sourceDeviceId}`])
              }
            })
          }
        )
      }
    })
  }

  private createIntrusion(detection: Detection, intrusionRule: IntrusionRule): Intrusion {
    return {
      id: SecurityRulesFactory.newId(),
      timestamp: detection.timestamp,
      detectionId: detection.id,
      intrusionRuleId: intrusionRule.id.value
    } as Intrusion
  }

  private createOutlier(measurement: Measurement, rangeRule: RangeRule): Outlier {
    return {
      id: SecurityRulesFactory.newId(),
      timestamp: measurement.timestamp,
      measurementId: measurement.id,
      rangeRuleId: rangeRule.id.value
    } as Outlier
  }

  private async checkIntrusion(detection: Detection): Promise<IntrusionRule | undefined> {
    return this.getActiveIntrusionRules().then(rules =>
      rules.find(rule => rule.activeOn === detection.id.value && rule.objectClass === detection.objectClass)
    )
  }

  private async checkMeasurement(measurement: Measurement): Promise<RangeRule | undefined> {
    return this.getActiveRangeRules().then(rules =>
      rules.find(
        (rule: RangeRule) =>
          rule.activeOn === measurement.id.value &&
          rule.measure === measurement.measure &&
          (measurement.value < rule.min || measurement.value > rule.max)
      )
    )
  }

  private async getActiveRules(): Promise<SecurityRule[]> {
    return this._repository
      .getSecurityRules()
      .then((rules: SecurityRule[]) =>
        rules
          .filter((rule: SecurityRule) => this.isEnabled(rule))
          .filter((rule: SecurityRule) =>
            this.checkIfDateIsInRange(new Date(), rule.validity.from, rule.validity.to)
          )
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

  private checkIfDateIsInRange = (date: Date, from: Date, to: Date): boolean => {
    // TODO: unit testing this function could be a good idea :D
    date.setHours(date.getHours() + 1) // correction due to timezone
    return (
      (date.getHours() > from.getHours() ||
        (date.getHours() === from.getHours() && date.getMinutes() >= from.getMinutes())) &&
      (date.getHours() < to.getHours() ||
        (date.getHours() === to.getHours() && date.getMinutes() <= to.getMinutes()))
    )
  }

  async getRangeRules(): Promise<RangeRule[]> {
    return await this._repository.getRangeRules()
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    return await this._repository.getIntrusionRules()
  }

  async getSecurityRuleById(id: SecurityRuleId): Promise<SecurityRule> {
    return this._repository.getSecurityRuleById(id)
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
    measure: Measure
  ): Promise<SecurityRuleId> {
    const rule: RangeRule = SecurityRulesFactory.createRangeRule(
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
    await this._repository.saveSecurityRule(rule)
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
      activeOn,
      creatorId,
      intrusionObject,
      contacts,
      description,
      SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
      true
    )
    await this._repository.saveSecurityRule(rule)
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
    return this._repository.getSecurityRuleById(rangeRuleId).then((rule: SecurityRule) => {
      const update = {
        ...(rule as RangeRule),
        description,
        contacts,
        validity: SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
        min: minValue,
        max: maxValue
      }
      this._repository.updateSecurityRule(update)
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
    return this._repository.getSecurityRuleById(intrusionRuleId).then((rule: SecurityRule) => {
      const update = {
        ...(rule as IntrusionRule),
        description,
        contacts,
        validity: SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
        objectClass: intrusionObject
      }
      this._repository.updateSecurityRule(update)
    })
  }

  async enableSecurityRule(id: SecurityRuleId): Promise<void> {
    await this._repository.enableSecurityRule(id)
  }

  async disableSecurityRule(id: SecurityRuleId): Promise<void> {
    await this._repository.disableSecurityRule(id)
  }

  async deleteSecurityRule(id: SecurityRuleId): Promise<void> {
    await this._repository.removeSecurityRule(id)
  }

  private extractContactsFrom(rules: SecurityRule[]): Contact[] {
    return [...new Set(rules.flatMap((rule: SecurityRule) => rule.contacts))]
  }

  getSecurityRuleContacts(id: SecurityRuleId): Promise<Contact[]> {
    return this.getSecurityRuleById(id).then((rule: SecurityRule) => this.extractContactsFrom([rule]))
  }
}

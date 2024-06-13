import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { SecurityRulesRepository } from '../repositories/SecurityRulesRepository'
import { SecurityRuleService } from './SecurityRuleService'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { SecurityRuleId } from '@/domain/core/rules/SecurityRuleId'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory'
import { Contact } from 'common/dist/domain/core/Contact'
import { MeasureType } from 'common/dist/domain/core/MeasureType'
import { ObjectClass } from '@/domain/core/ObjectClass'

export class SecurityRuleServiceImpl implements SecurityRuleService {
  private repository: SecurityRulesRepository

  constructor(repository: SecurityRulesRepository) {
    this.repository = repository
  }

  async getRangeRules(): Promise<RangeRule[]> {
    return await this.repository.getRangeRules()
  }

  async getIntrusionRules(): Promise<IntrusionRule[]> {
    return await this.repository.getIntrusionRules()
  }

  async getSecurityRuleById(id: SecurityRuleId | string): Promise<SecurityRule> {
    return this.repository.getSecurityRuleById(typeof id === 'string' ? SecurityRulesFactory.idOf(id) : id)
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
    const rule = SecurityRulesFactory.createRangeRule(
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
    );
    await this.repository.saveSecurityRule(rule);
    return rule.id;
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
    const rule = SecurityRulesFactory.createIntrusionRule(
      SecurityRulesFactory.newId(),
      activeOn,
      creatorId,
      intrusionObject,
      contacts,
      description,
      SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
      true
    );
    await this.repository.saveSecurityRule(rule);
    return rule.id;
  }
  updateRangeRule(
    rangeRuleId: string | SecurityRuleId,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    minValue: number,
    maxValue: number
  ): Promise<void> {
    return this.repository.getSecurityRuleById(
      typeof rangeRuleId === 'string' ? SecurityRulesFactory.idOf(rangeRuleId) : rangeRuleId
    ).then((rule: SecurityRule) => {
      const update = {
        ...(rule as RangeRule),
        description,
        contacts,
        validity: SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
        min: minValue,
        max: maxValue
      };
      this.repository.updateSecurityRule(update);
    });
  }
  updateIntrusionRule(
    intrusionRuleId: string | SecurityRuleId,
    description: string,
    contacts: Contact[],
    validFrom: Date,
    validUntil: Date,
    intrusionObject: ObjectClass
  ): Promise<void> {
    return this.repository.getSecurityRuleById(
      typeof intrusionRuleId === 'string' ? SecurityRulesFactory.idOf(intrusionRuleId) : intrusionRuleId
    ).then((rule: SecurityRule) => {
      const update = {
        ...(rule as IntrusionRule),
        description,
        contacts,
        validity: SecurityRulesFactory.newTimeSlot(validFrom, validUntil),
        objectClass: intrusionObject
      };
      this.repository.updateSecurityRule(update);
    });
  }
  async enableSecurityRule(id: SecurityRuleId | string): Promise<void> {
    this.repository.enableSecurityRule(typeof id === 'string' ? SecurityRulesFactory.idOf(id) : id);
  }
  async disableSecurityRule(id: SecurityRuleId | string): Promise<void> {
    this.repository.disableSecurityRule(typeof id === 'string' ? SecurityRulesFactory.idOf(id) : id);
  }

  async deleteSecurityRule(id: SecurityRuleId | string): Promise<void> {
    this.repository.removeSecurityRule(typeof id === 'string' ? SecurityRulesFactory.idOf(id) : id);
  }

  async isOutlier(deviceId: DeviceId, measurement: Measurement): Promise<boolean> {
    return (
      (await this.getActiveRangeRules()).filter(
        (rule: RangeRule) =>
          this.hourComparator(environmentData.timestamp, rule.from, rule.to) &&
          rule.deviceId.code === environmentData.sourceDeviceId.code &&
          rule.measure === environmentData.measure &&
          (environmentData.value < rule.min || environmentData.value > rule.max)
      ).length > 0
    )
  }

  async isIntrusion(deviceId: DeviceId, objectClass: ObjectClass, timestamp: Date): Promise<boolean> {
    return (
      (await this.getActiveIntrusionRules()).filter(
        (rule: IntrusionRule) =>
          this.hourComparator(timestamp, rule.from, rule.to) &&
          rule.deviceId.code === cameraId.code &&
          rule.objectClass === objectClass
      ).length > 0
    )
  }

  async getActiveRules(): Promise<SecurityRule[]> {
    const exceedingRules: SecurityRule[] = await this.repository.getRangeRules()
    const intrusionRules: SecurityRule[] = await this.repository.getIntrusionRules()
    const rules: SecurityRule[] = exceedingRules.concat(intrusionRules)
    return rules.filter((rule: SecurityRule) => this.hourComparator(new Date(), rule.from, rule.to))
  }

  async getActiveRangeRules(): Promise<RangeRule[]> {
    return (await this.getActiveRules()).filter(
      (rule: SecurityRule): boolean => rule.activeOn.type === DeviceType.SENSOR
    ) as RangeRule[]
  }

  async getActiveIntrusionRules(): Promise<IntrusionRule[]> {
    return (await this.getActiveRules()).filter(
      (rule: SecurityRule): boolean => rule.activeOn.type === DeviceType.CAMERA
    ) as IntrusionRule[]
  }

  async getContactsToNotify(anomaly: Anomaly): Promise<Contact[]> {
    switch (anomaly.deviceId.type) {
      case DeviceType.CAMERA:
        return (await this.getActiveIntrusionRules())
          .filter(
            (rule: IntrusionRule) =>
              this.hourComparator(anomaly.timestamp, rule.from, rule.to) &&
              rule.deviceId.code === anomaly.deviceId.code &&
              rule.objectClass === (anomaly as Intrusion).intrusionObject
          )
          .flatMap((rule: IntrusionRule) => rule.contactsToNotify)
      case DeviceType.SENSOR:
        return (await this.getActiveRangeRules())
          .filter(
            (rule: RangeRule) =>
              this.hourComparator(anomaly.timestamp, rule.from, rule.to) &&
              rule.deviceId.code === anomaly.deviceId.code &&
              rule.measure === (anomaly as Exceeding).measure
          )
          .flatMap((rule: RangeRule) => rule.contactsToNotify)
    }
  }

  hourComparator = (date: Date, from: Date, to: Date): boolean => {
    date.setHours(date.getHours() + 1) // correction due to timezone
    return (
      (date.getHours() > from.getHours() ||
        (date.getHours() === from.getHours() && date.getMinutes() >= from.getMinutes())) &&
      (date.getHours() < to.getHours() ||
        (date.getHours() === to.getHours() && date.getMinutes() <= to.getMinutes()))
    )
  }
}

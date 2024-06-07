
export class SecurityRuleFactoryImpl implements SecurityRuleFactory {
  createIntrusionRule(
    id: SecurityRuleId,
    activeOn: DeviceId,
    creatorId: UserId,
    objectClass: ObjectClass,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    enabled: boolean
  ): IntrusionRule {
    return new IntrusionRuleImpl(
      objectClass,
      id,
      activeOn,
      creatorId,
      contacts,
      description,
      validity,
      enabled
    )
  }

  createRangeRule(
    id: SecurityRuleId,
    activeOn: DeviceId,
    creatorId: string,
    contacts: Contact[],
    description: string,
    validity: TimeSlot,
    min: number,
    max: number,
    measure: MeasureType,
    enabled: boolean
  ): RangeRule {
    return new RangeRuleImpl(
      min,
      max,
      measure,
      id,
      activeOn,
      creatorId,
      contacts,
      description,
      validity,
      enabled
    )
  }
}

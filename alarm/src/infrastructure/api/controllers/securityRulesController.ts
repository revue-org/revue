import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { AlarmService } from '@/application/services/AlarmService'
import { AlarmServiceImpl } from '@/application/services/impl/AlarmServiceImpl.js'
import { SecurityRulesFactory } from '@/domain/factories/SecurityRulesFactory.js'
import { MongoDBSecurityRuleRepository } from '@/infrastructure/storage/MongoDBSecurityRuleRepository.js'
import { Contact } from '@common/domain/core/Contact'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { Measure } from '@common/domain/core'
import { ObjectClass } from '@common/domain/core/ObjectClass.js'
import { KafkaAlarmEventsHub } from '@/infrastructure/events/KafkaAlarmEventsHub.js'
import { KafkaOptions } from 'common/dist/infrastructure/events/KafkaOptions'

const getKafkaOptions = (): KafkaOptions => {
  let kafkaHost: string = process.env.KAFKA_HOST!
  let kafkaPort: string = process.env.KAFKA_PORT!

  if (process.env.NODE_ENV == 'develop') {
    console.log('INFO: KAFKA DEVELOPMENT MODE')
    kafkaHost = process.env.KAFKA_EXTERNAL_HOST!
    kafkaPort = process.env.KAFKA_EXTERNAL_PORT!
  }
  return {
    clientId: 'alarm',
    brokers: [{ host: kafkaHost, port: kafkaPort }],
    groupId: 'alarmConsumer'
  } as KafkaOptions
}
const service: AlarmService = new AlarmServiceImpl(new MongoDBSecurityRuleRepository(), new KafkaAlarmEventsHub(getKafkaOptions()))

export const securityRuleController = {
  getSecurityRuleById: async (id: string): Promise<SecurityRule> => {
    return service.getSecurityRuleById(SecurityRulesFactory.idOf(id))
  },

  getRangeRuleById: (id: string): Promise<RangeRule> => {
    return service.getSecurityRuleById(SecurityRulesFactory.idOf(id)).then(rule => rule as RangeRule)
  },

  getIntrusionRuleById: (id: string): Promise<IntrusionRule> => {
    return service.getSecurityRuleById(SecurityRulesFactory.idOf(id)).then(rule => rule as IntrusionRule)
  },

  getRangeRules: async (): Promise<RangeRule[]> => {
    return await service.getRangeRules()
  },

  getIntrusionRules: async (): Promise<IntrusionRule[]> => {
    return await service.getIntrusionRules()
  },

  createRangeRule: async (
    deviceId: string,
    creatorId: string,
    description: string,
    measure: Measure,
    minValue: number,
    maxValue: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await service.createRangeRule(
      creatorId,
      deviceId,
      description,
      contacts,
      from,
      to,
      minValue,
      maxValue,
      measure
    )
  },

  createIntrusionRule: async (
    deviceId: string,
    creatorId: string,
    description: string,
    objectClass: string,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await service.createIntrusionRule(
      creatorId,
      deviceId,
      description,
      contacts,
      from,
      to,
      ObjectClass[objectClass as keyof typeof ObjectClass]
    )
  },

  updateRangeRule: async (
    ruleId: string,
    description: string,
    min: number,
    max: number,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await service.updateRangeRule(
      SecurityRulesFactory.idOf(ruleId),
      description,
      contacts,
      from,
      to,
      min,
      max
    )
  },

  updateIntrusionRule: async (
    ruleId: string,
    description: string,
    objectClass: string,
    from: Date,
    to: Date,
    contacts: Contact[]
  ): Promise<void> => {
    await service.updateIntrusionRule(
      SecurityRulesFactory.idOf(ruleId),
      description,
      contacts,
      from,
      to,
      ObjectClass[objectClass as keyof typeof ObjectClass]
    )
  },

  deleteSecurityRule: async (id: string): Promise<void> => {
    await service.deleteSecurityRule(SecurityRulesFactory.idOf(id))
  },

  getSecurityRuleContacts: async (id: string): Promise<Contact[]> => {
    return service.getSecurityRuleContacts(SecurityRulesFactory.idOf(id))
  }
}

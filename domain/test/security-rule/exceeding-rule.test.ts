import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { SecurityRuleService } from '../../src/application/alarm-system/SecurityRuleService.js'
import { SecurityRuleServiceImpl } from '../../src/application/alarm-system/impl/SecurityRuleServiceImpl.js'
import {
  DeviceIdFactory,
  DeviceIdFactoryImpl,
  EnvironmentDataFactory,
  EnvironmentDataFactoryImpl
} from '../../src/domain/device/factories'
import { SecurityRuleFactory, SecurityRuleFactoryImpl } from '../../src/domain/alarm-system/factories'
import { DeviceId, Measure, MeasureUnit } from '../../src/domain/device/core'
import { Contact, ContactType } from '../../src/domain/monitoring/core'
import { ContactFactory, ContactFactoryImpl } from '../../src/domain/monitoring/factories'
import { ExceedingRule } from '../../src/domain/alarm-system/core'

describe('Check for exceeding', (): void => {
  let securityRuleService: SecurityRuleService
  let environmentDataFactory: EnvironmentDataFactory
  let deviceIdFactory: DeviceIdFactory
  let securityRuleFactory: SecurityRuleFactory
  let contactFactory: ContactFactory

  let testSensorId: DeviceId
  let testContact: Contact
  let testSecurityRuleId: string

  beforeAll(async (): Promise<void> => {
    securityRuleService = new SecurityRuleServiceImpl()
    environmentDataFactory = new EnvironmentDataFactoryImpl()
    deviceIdFactory = new DeviceIdFactoryImpl()
    securityRuleFactory = new SecurityRuleFactoryImpl()
    contactFactory = new ContactFactoryImpl()

    testSensorId = deviceIdFactory.createSensorId('FAKE_SENSOR_CODE')
    testContact = contactFactory.createContact('3333333333', ContactType.SMS)
    testSecurityRuleId = 'FAKE_SECURITY_RULE_ID'

    let testSecurityRule: ExceedingRule = securityRuleFactory.createExceedingRule(
      0,
      10,
      Measure.TEMPERATURE,
      testSecurityRuleId,
      testSensorId,
      '',
      [testContact],
      'DESCRIPTION',
      new Date('2020-01-01T01:00:00.000Z'),
      new Date('2025-01-01T20:00:00.000Z')
    )

    securityRuleService.addSecurityRule(testSecurityRule)
  })
  describe('Checking for exceeding detection with exceeding value but different timestamps', (): void => {
    it('responds with a true value if there is an active rule on the measure', async (): Promise<void> => {
      //NOTE: the value is 30 and the hours is between the from and the to dates of the security rule
      expect(
        securityRuleService.checkExceedingDetection(
          environmentDataFactory.createEnvironmentData(
            testSensorId,
            30,
            Measure.TEMPERATURE,
            MeasureUnit.CELSIUS,
            new Date('2024-01-01T01:10:00.000Z')
          )
        )
      ).toBe(true)
    })

    it('is false if the environment data timestamp is not between the from and the to date', async (): Promise<void> => {
      //NOTE: the value is 30 and the hours is NOT between the from and the to dates of the security rule
      expect(
        securityRuleService.checkExceedingDetection(
          environmentDataFactory.createEnvironmentData(
            testSensorId,
            30,
            Measure.TEMPERATURE,
            MeasureUnit.CELSIUS,
            new Date('2024-01-01T00:10:00.000Z')
          )
        )
      ).toBe(false)
    })
  })

  describe('Checking for exceeding detection without exceeding value', (): void => {
    it('responds with a true value if there is an active rule on the measure', async (): Promise<void> => {
      //NOTE: the value is 5 and the hours is between the from and the to dates of the security rule
      expect(
        securityRuleService.checkExceedingDetection(
          environmentDataFactory.createEnvironmentData(
            testSensorId,
            5,
            Measure.TEMPERATURE,
            MeasureUnit.CELSIUS,
            new Date('2024-01-01T01:10:00.000Z')
          )
        )
      ).toBe(false)
    })

    it('is false if the environment data timestamp is not between the from and the to date', async (): Promise<void> => {
      //NOTE: the value is 5 and the hours is NOT between the from and the to dates of the security rule
      expect(
        securityRuleService.checkExceedingDetection(
          environmentDataFactory.createEnvironmentData(
            testSensorId,
            5,
            Measure.TEMPERATURE,
            MeasureUnit.CELSIUS,
            new Date('2024-01-01T00:10:00.000Z')
          )
        )
      ).toBe(false)
    })
  })

  afterAll(async (): Promise<void> => {
    securityRuleService.removeSecurityRule(testSecurityRuleId)
  })
})

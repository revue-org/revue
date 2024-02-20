import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { SecurityRuleServiceImpl } from '../../src/application/security-rule/impl/SecurityRuleServiceImpl.js';
import { DeviceIdFactoryImpl, EnvironmentDataFactoryImpl } from '../../src/domain/device/factories';
import { SecurityRuleFactoryImpl } from '../../src/domain/security-rule/factories';
import { Measure, MeasureUnit } from '../../src/domain/device/core';
import { ContactType } from '../../src/domain/monitoring/core';
import { ContactFactoryImpl } from '../../src/domain/monitoring/factories';
describe('Check for exceeding', () => {
    let securityRuleService;
    let environmentDataFactory;
    let deviceIdFactory;
    let securityRuleFactory;
    let contactFactory;
    let testSensorId;
    let testContact;
    let testSecurityRuleId;
    beforeAll(async () => {
        securityRuleService = new SecurityRuleServiceImpl();
        environmentDataFactory = new EnvironmentDataFactoryImpl();
        deviceIdFactory = new DeviceIdFactoryImpl();
        securityRuleFactory = new SecurityRuleFactoryImpl();
        contactFactory = new ContactFactoryImpl();
        testSensorId = deviceIdFactory.createSensorId('FAKE_SENSOR_CODE');
        testContact = contactFactory.createContact('3333333333', ContactType.SMS);
        testSecurityRuleId = 'FAKE_SECURITY_RULE_ID';
        let testSecurityRule = securityRuleFactory.createExceedingRule(0, 10, Measure.TEMPERATURE, testSecurityRuleId, testSensorId, '', [testContact], 'DESCRIPTION', new Date('2020-01-01T01:00:00.000Z'), new Date('2025-01-01T20:00:00.000Z'));
        securityRuleService.addSecurityRule(testSecurityRule);
    });
    describe('Checking for exceeding detection with exceeding value but different timestamps', () => {
        it('responds with a true value if there is an active rule on the measure', async () => {
            //NOTE: the value is 30 and the hours is between the from and the to dates of the security rule
            expect(securityRuleService.checkExceedingDetection(environmentDataFactory.createEnvironmentData(testSensorId, 30, Measure.TEMPERATURE, MeasureUnit.CELSIUS, new Date('2024-01-01T01:10:00.000Z')))).toBe(true);
        });
        it('is false if the environment data timestamp is not between the from and the to date', async () => {
            //NOTE: the value is 30 and the hours is NOT between the from and the to dates of the security rule
            expect(securityRuleService.checkExceedingDetection(environmentDataFactory.createEnvironmentData(testSensorId, 30, Measure.TEMPERATURE, MeasureUnit.CELSIUS, new Date('2024-01-01T00:10:00.000Z')))).toBe(false);
        });
    });
    describe('Checking for exceeding detection without exceeding value', () => {
        it('responds with a true value if there is an active rule on the measure', async () => {
            //NOTE: the value is 5 and the hours is between the from and the to dates of the security rule
            expect(securityRuleService.checkExceedingDetection(environmentDataFactory.createEnvironmentData(testSensorId, 5, Measure.TEMPERATURE, MeasureUnit.CELSIUS, new Date('2024-01-01T01:10:00.000Z')))).toBe(false);
        });
        it('is false if the environment data timestamp is not between the from and the to date', async () => {
            //NOTE: the value is 5 and the hours is NOT between the from and the to dates of the security rule
            expect(securityRuleService.checkExceedingDetection(environmentDataFactory.createEnvironmentData(testSensorId, 5, Measure.TEMPERATURE, MeasureUnit.CELSIUS, new Date('2024-01-01T00:10:00.000Z')))).toBe(false);
        });
    });
    afterAll(async () => {
        securityRuleService.removeSecurityRule(testSecurityRuleId);
    });
});

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { SecurityRuleService } from "../../src/application/security-rule/SecurityRuleService.js";
import { SecurityRuleServiceImpl } from "../../src/application/security-rule/impl/SecurityRuleServiceImpl.js";
import {
  DeviceIdFactory,
  DeviceIdFactoryImpl,
  EnvironmentDataFactory,
  EnvironmentDataFactoryImpl
} from "../../src/domain/device/factories";
import { SecurityRuleFactory, SecurityRuleFactoryImpl } from "../../src/domain/security-rule/factories";
import { DeviceId, Measure, MeasureUnit } from "../../src/domain/device/core";
import { Contact, ContactType } from "../../src/domain/monitoring/core";
import { ContactFactory, ContactFactoryImpl } from "../../src/domain/monitoring/factories";
import { ExceedingRule } from "../../src/domain/security-rule/core";


describe("Check for exceeding", (): void => {
  let securityRuleService: SecurityRuleService;
  let environmentDataFactory: EnvironmentDataFactory;
  let deviceIdFactory: DeviceIdFactory;
  let securityRuleFactory: SecurityRuleFactory;
  let contactFactory: ContactFactory;

  let testSensorId: DeviceId;
  let testContact: Contact;
  let testSecurityRuleId: string;

  beforeAll(async (): Promise<void> => {
    securityRuleService = new SecurityRuleServiceImpl();
    environmentDataFactory = new EnvironmentDataFactoryImpl();
    deviceIdFactory = new DeviceIdFactoryImpl();
    securityRuleFactory = new SecurityRuleFactoryImpl();
    contactFactory = new ContactFactoryImpl();

    testSensorId = deviceIdFactory.createSensorId("FAKE_SENSOR_CODE");
    testContact = contactFactory.createContact("3333333333", ContactType.SMS);
    testSecurityRuleId = "FAKE_SECURITY_RULE_ID";

    let testSecurityRule: ExceedingRule = securityRuleFactory.createExceedingRule(
      0, 10,
      Measure.TEMPERATURE,
      testSecurityRuleId,
      testSensorId, "", [testContact], "DESCRIPTION",
      new Date("2020-01-01T01:00:00.000Z"), new Date("2025-01-01T01:00:00.000Z")
    );

    securityRuleService.addSecurityRule(testSecurityRule);
  });
  describe("Checking for exceeding detection", (): void => {
    it("responds with a true value if there is an active rule on the measure", async (): Promise<void> => {
      //NOTE: the value is 30, so it exceeds the maximum value of the rule
      expect(securityRuleService.checkExceedingDetection(
        environmentDataFactory.createEnvironmentData(testSensorId, 30, Measure.TEMPERATURE, MeasureUnit.CELSIUS, new Date())))
        .toBe(true);
    });

  });

  describe("Checking for false exceeding detection", (): void => {
/*    it("responds with a forbidden status if no auth token is provided", async (): Promise<void> => {
      // @ts-ignore
      const intrusions: Response = await alarmService.get("/anomalies/exceedings");
      expect(intrusions.status).toBe(HttpStatusCode.FORBIDDEN);
    });

    it("responds with the exceedings otherwise", async (): Promise<void> => {
      // @ts-ignore
      const exceedings: Response = await alarmService
        .get("/anomalies/exceedings")
        .set("Authorization", `Bearer ${TOKEN}`);
      expect(exceedings.status).toBe(HttpStatusCode.OK);
      expect(exceedings.type).toBe("application/json");
    });*/
  });

  /*  describe('GET /anomalies/intrusions', (): void => {
      it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
        // @ts-ignore
        const intrusions: Response = await alarmService.get('/anomalies/intrusions')
        expect(intrusions.status).toBe(HttpStatusCode.FORBIDDEN)
      })

      it('responds with the intrusions otherwise', async (): Promise<void> => {
        // @ts-ignore
        const intrusions: Response = await alarmService
          .get('/anomalies/intrusions')
          .set('Authorization', `Bearer ${TOKEN}`)
        expect(intrusions.status).toBe(HttpStatusCode.OK)
        expect(intrusions.type).toBe('application/json')
      })
    })*/

  afterAll(async (): Promise<void> => {
    console.log("ESEGUO AFTER ALL PER TUTTI I DOMAIN TEST (ExceedingRule)")
  });
});

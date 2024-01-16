import { securityRuleController } from '../controller/securityRule.js'
import express, { Request, Response, Router } from 'express'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { SecurityRule } from "@domain/security-rule/core/SecurityRule.js";
import { IntrusionRule } from "@domain/security-rule/core/IntrusionRule.js";
import { ExceedingRule } from "@domain/security-rule/core/ExceedingRule.js";
import { AnomalyTypeConverter } from "@utils/AnomalyTypeConverter.js";
import { AnomalyType } from "@domain/anomaly/core/impl/enum/AnomalyType.js";

export const securityRuleRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

securityRuleRouter.route('/:id').get((req: Request, res: Response): void => {
  securityRuleController
    .getSecurityRuleById(req.params.id)
    .then((securityRule: SecurityRule): void => {
      res.send(securityRule)
    })
    .catch((): void => {
      res.send({ error: 'No security rule found' })
    })
})

securityRuleRouter.route('/exceeding').get((req: Request, res: Response): void => {
  securityRuleController
    .getExceedingRules()
    .then((exceedingRules: ExceedingRule[]): void => {
      res.send(exceedingRules)
    })
    .catch((): void => {
      res.send({ error: 'No exceeding rules found' })
    })
})

securityRuleRouter.route('/intrusion').get((req: Request, res: Response): void => {
  securityRuleController
    .getIntrusionRules()
    .then((intrusionRules: IntrusionRule[]): void => {
      res.send(intrusionRules)
    })
    .catch((): void => {
      res.send({ error: 'No intrusion rules found' })
    })
})

securityRuleRouter.route('/').post((req: Request, res: Response): void => {
  switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
    case AnomalyType.EXCEEDING:
      securityRuleController
        .createExceedingRule(
          deviceIdFactory.createSensorId(req.body.deviceId.code),
          req.body.creatorId,
          req.body.description,
          MeasureConverter.convertToMeasure(req.body.measure),
          req.body.minValue,
          req.body.maxValue,
          new Date(req.body.from),
          new Date(req.body.to),
          req.body.contactsToNotify
        )
        .then((): void => {
          res.send({ success: 'Exceeding rule created' })
        })
        .catch((): void => {
          res.send({ error: 'Exceeding rule not created' })
        })
      break
    case AnomalyType.INTRUSION:
      securityRuleController
        .createIntrusionRule(
          deviceIdFactory.createCameraId(req.body.deviceId.code),
          req.body.creatorId,
          req.body.description,
          ObjectClassConverter.convertToObjectClass(req.body.objectClass),
          new Date(req.body.from),
          new Date(req.body.to),
          req.body.contactsToNotify
        )
        .then((): void => {
          res.send({ success: 'Intrusion rule created' })
        })
        .catch((): void => {
          res.send({ error: 'Intrusion rule not created' })
        })
      break
  }
})
securityRuleRouter.route('/').put((req: Request, res: Response): void => {
  switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
    case AnomalyType.EXCEEDING:
      securityRuleController
        .updateExceedingRule(
          req.body.securityRuleId,
          deviceIdFactory.createSensorId(req.body.deviceId.code),
          req.body.description,
          MeasureConverter.convertToMeasure(req.body.measure),
          req.body.minValue,
          req.body.maxValue,
          new Date(req.body.from),
          new Date(req.body.to),
          req.body.contactsToNotify
        )
        .then((): void => {
          res.send({ success: 'Exceeding rule updated' })
        })
        .catch((): void => {
          res.send({ error: 'Exceeding rule not updated' })
        })
      break
    case AnomalyType.INTRUSION:
      securityRuleController
        .updateIntrusionRule(
          req.body.securityRuleId,
          deviceIdFactory.createCameraId(req.body.deviceId.code),
          req.body.description,
          ObjectClassConverter.convertToObjectClass(req.body.objectClass),
          new Date(req.body.from),
          new Date(req.body.to),
          req.body.contactsToNotify
        )
        .then((): void => {
          res.send({ success: 'Intrusion rule updated' })
        })
        .catch((): void => {
          res.send({ error: 'Intrusion rule not updated' })
        })
      break
  }
})

securityRuleRouter.route('/').delete((req: Request, res: Response): void => {
  securityRuleController
    .deleteSecurityRule(req.body.id)
    .then((): void => {
      res.send({ success: 'Security rule correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Security rule not deleted' })
    })
})

import { securityRuleController } from '../controller/securityRule.js'
import express, { Request, Response, Router } from 'express'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { SecurityRule } from '@domain/security-rule/core/SecurityRule.js'
import { IntrusionRule } from '@domain/security-rule/core/IntrusionRule.js'
import { ExceedingRule } from '@domain/security-rule/core/ExceedingRule.js'
import HttpStatusCode from '../utils/HttpStatusCode.js'

export const securityRuleRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

securityRuleRouter.route('/exceedings').get((req: Request, res: Response): void => {
  securityRuleController
    .getExceedingRules()
    .then((exceedingRules: ExceedingRule[]): void => {
      res.status(HttpStatusCode.OK).send(exceedingRules)
    })
    .catch((): void => {
      res.send({ error: 'No exceeding rules found' })
    })
})

securityRuleRouter.route('/intrusions').get((req: Request, res: Response): void => {
  securityRuleController
    .getIntrusionRules()
    .then((intrusionRules: IntrusionRule[]): void => {
      res.status(HttpStatusCode.OK).send(intrusionRules)
    })
    .catch((): void => {
      res.send({ error: 'No intrusion rules found' })
    })
})

securityRuleRouter.route('/:id').get((req: Request, res: Response): void => {
  securityRuleController
    .getSecurityRuleById(req.params.id)
    .then((securityRule: SecurityRule): void => {
      res.status(HttpStatusCode.OK).send(securityRule)
    })
    .catch((): void => {
      res.send({ error: 'No security rule found' })
    })
})

securityRuleRouter.route('/exceedings').post((req: Request, res: Response): void => {
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
      req.body.contacts
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Exceeding rule created' })
    })
    .catch((err): void => {
      console.log(err)
      res.send({ error: 'Exceeding rule not created' })
    })
})

securityRuleRouter.route('/intrusions').post((req: Request, res: Response): void => {
  securityRuleController
    .createIntrusionRule(
      deviceIdFactory.createCameraId(req.body.deviceId.code),
      req.body.creatorId,
      req.body.description,
      ObjectClassConverter.convertToObjectClass(req.body.objectClass),
      new Date(req.body.from),
      new Date(req.body.to),
      req.body.contacts
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Intrusion rule created' })
    })
    .catch((): void => {
      res.send({ error: 'Intrusion rule not created' })
    })
})

securityRuleRouter.route('/exceedings').put((req: Request, res: Response): void => {
  securityRuleController
    .updateExceedingRule(
      req.body.id,
      deviceIdFactory.createSensorId(req.body.deviceId.code),
      req.body.description,
      MeasureConverter.convertToMeasure(req.body.measure),
      req.body.minValue,
      req.body.maxValue,
      new Date(req.body.from),
      new Date(req.body.to),
      req.body.contacts
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Exceeding rule updated' })
    })
    .catch((): void => {
      res.send({ error: 'Exceeding rule not updated' })
    })
})

securityRuleRouter.route('/intrusions').put((req: Request, res: Response): void => {
  securityRuleController
    .updateIntrusionRule(
      req.body.id,
      deviceIdFactory.createCameraId(req.body.deviceId.code),
      req.body.description,
      ObjectClassConverter.convertToObjectClass(req.body.objectClass),
      new Date(req.body.from),
      new Date(req.body.to),
      req.body.contacts
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Intrusion rule updated' })
    })
    .catch((): void => {
      res.send({ error: 'Intrusion rule not updated' })
    })
})

securityRuleRouter.route('/exceedings/:id').delete((req: Request, res: Response): void => {
  securityRuleController
    .deleteExceedingRule(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Exceeding rule correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Exceeding rule not deleted' })
    })
})

securityRuleRouter.route('/intrusions/:id').delete((req: Request, res: Response): void => {
  securityRuleController
    .deleteIntrusionRule(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Intrusion rule correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Intrusion rule not deleted' })
    })
})

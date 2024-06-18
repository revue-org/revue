import express, { Router, Request, Response } from 'express'
import { securityRuleController as controller } from '../controllers/securityRulesController.js'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { HttpStatusCode } from 'axios'

export const securityRulesRouter: Router = express.Router()

securityRulesRouter.route('/:id').get((req: Request, res: Response): void => {
  controller
    .getSecurityRuleById(req.params.id)
    .then((securityRule: SecurityRule): void => {
      res.status(HttpStatusCode.Ok).send(securityRule)
    })
    .catch((): void => {
      res.send({ error: 'No security rule found' })
    })
})

securityRulesRouter
  .route('/exceedings')
  .get((req: Request, res: Response): void => {
    controller
      .getRangeRules()
      .then((exceedingRules: RangeRule[]): void => {
        res.status(HttpStatusCode.Ok).send(exceedingRules)
      })
      .catch((): void => {
        res.send({ error: 'No exceeding rules found' })
      })
  })
  .post((req: Request, res: Response): void => {
    controller
      .createRangeRule(
        req.body.deviceId.code,
        req.body.creatorId,
        req.body.description,
        req.body.measure,
        req.body.min,
        req.body.max,
        new Date(req.body.from),
        new Date(req.body.to),
        req.body.contacts
      )
      .then((): void => {
        res.status(HttpStatusCode.Created).send({ success: 'Exceeding rule created' })
      })
      .catch((): void => {
        res.send({ error: 'Exceeding rule not created' })
      })
  })
  .put((req: Request, res: Response): void => {
    controller
      .updateRangeRule(
        req.body.id,
        req.body.description,
        req.body.min,
        req.body.max,
        new Date(req.body.from),
        new Date(req.body.to),
        req.body.contacts
      )
      .then((): void => {
        res.status(HttpStatusCode.Ok).send({ success: 'Exceeding rule updated' })
      })
      .catch((): void => {
        res.send({ error: 'Exceeding rule not updated' })
      })
  })

securityRulesRouter.route('/exceedings/:id').delete((req: Request, res: Response): void => {
  controller
    .deleteSecurityRule(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.Ok).send({ success: 'Exceeding rule correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Exceeding rule not deleted' })
    })
})

securityRulesRouter
  .route('/intrusions')
  .get((req: Request, res: Response): void => {
    controller
      .getIntrusionRules()
      .then((intrusionRules: IntrusionRule[]): void => {
        res.status(HttpStatusCode.Ok).send(intrusionRules)
      })
      .catch((): void => {
        res.send({ error: 'No intrusion rules found' })
      })
  })
  .post((req: Request, res: Response): void => {
    controller
      .createIntrusionRule(
        req.body.deviceId.code,
        req.body.creatorId,
        req.body.description,
        req.body.objectClass,
        new Date(req.body.from),
        new Date(req.body.to),
        req.body.contacts
      )
      .then((): void => {
        res.status(HttpStatusCode.Created).send({ success: 'Intrusion rule created' })
      })
      .catch((err): void => {
        console.log(err)
        res.send({ error: 'Intrusion rule not created' })
      })
  })
  .put((req: Request, res: Response): void => {
    controller
      .updateIntrusionRule(
        req.body.id,
        req.body.description,
        req.body.objectClass,
        new Date(req.body.from),
        new Date(req.body.to),
        req.body.contacts
      )
      .then((): void => {
        res.status(HttpStatusCode.Ok).send({ success: 'Intrusion rule updated' })
      })
      .catch((): void => {
        res.send({ error: 'Intrusion rule not updated' })
      })
  })

securityRulesRouter.route('/intrusions/:id').delete((req: Request, res: Response): void => {
  controller
    .deleteSecurityRule(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.Ok).send({ success: 'Intrusion rule correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Intrusion rule not deleted' })
    })
})

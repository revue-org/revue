import express, { Router, Request, Response } from 'express'
import { securityRuleController as controller } from '../controllers/securityRulesController.js'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { HttpStatusCode } from 'axios'
import { Contact } from 'common/dist/domain/core/Contact.js'

export const router: Router = express.Router()


router.route(':id')
  .get((req: Request, res: Response): void => {
    controller
      .getSecurityRuleById(req.params.id)
      .then((securityRule: SecurityRule): void => {
        res.status(HttpStatusCode.Ok).send(securityRule)
      })
      .catch((): void => {
        res.send({ error: 'No security rule found' })
      })
  })
  .delete((req: Request, res: Response): void => {
    controller.deleteSecurityRule(req.params.id).then(() => {
      res.status(HttpStatusCode.Ok).send({ success: 'Security rule correctly deleted' })
    }).catch(() => {
      res.send({ error: 'Security rule not deleted' })
    })
  })

router.route(':id/contacts')
  .get((req: Request, res: Response): void => {
    controller
      .getSecurityRuleContacts(req.params.id)
      .then((contacts: Contact[]): void => {
        res.status(HttpStatusCode.Ok).send(contacts)
      })
      .catch((): void => {
        res.send({ error: 'No contacts found' })
      })
  })

router.route('ranges')
  .get((req: Request, res: Response): void => {
    controller
      .getRangeRules()
      .then((rangeRules: RangeRule[]): void => {
        res.status(HttpStatusCode.Ok).send(rangeRules)
      })
      .catch((): void => {
        res.send({ error: 'No range rules found' })
      })
  })
  .post((req: Request, res: Response): void => {
    controller
      .createRangeRule(
        req.body.deviceId,
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
        res.status(HttpStatusCode.Created).send({ success: 'Range rule created' })
      })
      .catch((): void => {
        res.send({ error: 'Range rule not created' })
      })
  })

router.route('ranges/:id')
  .get((req: Request, res: Response): void => {
    controller
      .getRangeRuleById(req.params.id)
      .then((securityRule: SecurityRule): void => {
        res.status(HttpStatusCode.Ok).send(securityRule)
      })
      .catch((): void => {
        res.send({ error: 'No security rule found' })
      })
  })
  .put((req: Request, res: Response): void => {
    controller.updateRangeRule(
      req.body.id,
      req.body.description,
      req.body.min,
      req.body.max,
      new Date(req.body.from),
      new Date(req.body.to),
      req.body.contacts
    ).then(() => {
      res.status(HttpStatusCode.Ok).send({ success: 'Range rule updated' })
    }).catch(() => {
      res.send({ error: 'Range rule not updated' })
    })
  })

router.route('intrusions')
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
        req.body.deviceId,
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

router.route('intrusions/:id')
  .get((req: Request, res: Response): void => {
    controller
      .getIntrusionRuleById(req.params.id)
      .then((securityRule: SecurityRule): void => {
        res.status(HttpStatusCode.Ok).send(securityRule)
      })
      .catch((): void => {
        res.send({ error: 'No security rule found' })
      })
  })
  .put((req: Request, res: Response): void => {
    controller.updateIntrusionRule(
      req.body.id,
      req.body.description,
      req.body.objectClass,
      new Date(req.body.from),
      new Date(req.body.to),
      req.body.contacts
    ).then(() => {
      res.status(HttpStatusCode.Ok).send({ success: 'Intrusion rule updated' })
    }).catch(() => {
      res.send({ error: 'Intrusion rule not updated' })
    })
  })

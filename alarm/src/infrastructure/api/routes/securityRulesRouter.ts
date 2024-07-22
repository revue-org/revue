import express, { Request, Response, Router } from 'express'
import { securityRuleController as controller } from '../controllers/securityRulesController.js'
import { SecurityRule } from '@/domain/core/rules/SecurityRule'
import { RangeRule } from '@/domain/core/rules/RangeRule'
import { IntrusionRule } from '@/domain/core/rules/IntrusionRule'
import { Contact } from '@common/domain/core/Contact.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import {
  IntrusionRuleInsertion,
  IntrusionRuleUpdate,
  RangeRuleInsertion,
  RangeRuleUpdate
} from '@/presentation/schemas/SecurityRuleSchema.js'
import { SecurityRulePresenter } from '@/presentation/SecurityRulePresenter.js'
import { SecurityRulePresenterImpl } from '@/presentation/impl/SecurityRulePresenterImpl.js'

export const router: Router = express.Router()
const securityRulePresenter: SecurityRulePresenter = new SecurityRulePresenterImpl()

router.route('/:id/contacts').get((req: Request, res: Response): void => {
  controller
    .getSecurityRuleContacts(req.params.id)
    .then((contacts: Contact[]): void => {
      res.status(HttpStatusCode.OK).send(contacts)
    })
    .catch((): void => {
      res.send({ error: 'No contacts found' })
    })
})

router
  .route('/ranges')
  .get((req: Request, res: Response): void => {
    controller
      .getRangeRules()
      .then((rangeRules: RangeRule[]): void => {
        res.status(HttpStatusCode.OK).send(rangeRules)
      })
      .catch((e): void => {
        console.log(e)
        res.send({ error: 'No range rules found' })
      })
  })
  .post((req: Request, res: Response): void => {
    try {
      req.body.validityStart = new Date(req.body.validityStart)
      req.body.validityEnd = new Date(req.body.validityEnd)
      const msg: RangeRuleInsertion = securityRulePresenter.parseRangeRuleInsertion(req.body)
      controller
        .createRangeRule(
          msg.activeOn,
          msg.author,
          msg.description,
          msg.rule.measure,
          msg.rule.minValue,
          msg.rule.maxValue,
          msg.validityStart,
          msg.validityEnd,
          msg.contacts
        )
        .then((): void => {
          res.status(HttpStatusCode.CREATED).send({ success: 'Range rule created' })
        })
    } catch (err) {
      console.log(err)
      res.status(HttpStatusCode.BAD_REQUEST).send({ error: 'Range rule not created' })
    }
  })

router
  .route('/ranges/:id')
  .get((req: Request, res: Response): void => {
    controller
      .getRangeRuleById(req.params.id)
      .then((securityRule: SecurityRule): void => {
        res.status(HttpStatusCode.OK).send(securityRule)
      })
      .catch((): void => {
        res.send({ error: 'No security rule found' })
      })
  })
  .put((req: Request, res: Response): void => {
    req.body.validityStart = new Date(req.body.validityStart)
    req.body.validityEnd = new Date(req.body.validityEnd)
    const msg: RangeRuleUpdate = securityRulePresenter.parseRangeRuleUpdate(req.body)
    controller
      .updateRangeRule(
        req.params.id,
        msg.description,
        msg.min,
        msg.max,
        msg.validityStart,
        msg.validityEnd,
        msg.contacts
      )
      .then(() => {
        res.status(HttpStatusCode.OK).send({ success: 'Range rule updated' })
      })
      .catch(() => {
        res.send({ error: 'Range rule not updated' })
      })
  })

router
  .route('/intrusions')
  .get((req: Request, res: Response): void => {
    controller
      .getIntrusionRules()
      .then((intrusionRules: IntrusionRule[]): void => {
        res.status(HttpStatusCode.OK).send(intrusionRules)
      })
      .catch((e): void => {
        console.log(e)
        res.send({ error: 'No intrusion rules found' })
      })
  })
  .post((req: Request, res: Response): void => {
    req.body.validityStart = new Date(req.body.validityStart)
    req.body.validityEnd = new Date(req.body.validityEnd)
    const msg: IntrusionRuleInsertion = securityRulePresenter.parseIntrusionRuleInsertion(req.body)
    controller
      .createIntrusionRule(
        msg.activeOn,
        msg.author,
        msg.description,
        msg.objectClass,
        msg.validityStart,
        msg.validityEnd,
        msg.contacts
      )
      .then((): void => {
        res.status(HttpStatusCode.CREATED).send({ success: 'Intrusion rule created' })
      })
      .catch((err): void => {
        console.log(err)
        res.send({ error: 'Intrusion rule not created' })
      })
  })

router
  .route('/intrusions/:id')
  .get((req: Request, res: Response): void => {
    controller
      .getIntrusionRuleById(req.params.id)
      .then((securityRule: SecurityRule): void => {
        res.status(HttpStatusCode.OK).send(securityRule)
      })
      .catch((): void => {
        res.send({ error: 'No security rule found' })
      })
  })
  .put((req: Request, res: Response): void => {
    req.body.validityStart = new Date(req.body.validityStart)
    req.body.validityEnd = new Date(req.body.validityEnd)
    const msg: IntrusionRuleUpdate = securityRulePresenter.parseIntrusionRuleUpdate(req.body)
    controller
      .updateIntrusionRule(
        req.params.id,
        msg.description,
        msg.objectClass,
        msg.validityStart,
        msg.validityEnd,
        msg.contacts
      )
      .then(() => {
        res.status(HttpStatusCode.OK).send({ success: 'Intrusion rule updated' })
      })
      .catch(() => {
        res.send({ error: 'Intrusion rule not updated' })
      })
  })

router
  .route('/:id')
  .get((req: Request, res: Response): void => {
    controller
      .getSecurityRuleById(req.params.id)
      .then((securityRule: SecurityRule): void => {
        res.status(HttpStatusCode.OK).send(securityRule)
      })
      .catch((): void => {
        res.send({ error: 'No security rule found' })
      })
  })
  .delete((req: Request, res: Response): void => {
    controller
      .deleteSecurityRule(req.params.id)
      .then(() => {
        res.status(HttpStatusCode.OK).send({ success: 'Security rule correctly deleted' })
      })
      .catch(() => {
        res.send({ error: 'Security rule not deleted' })
      })
  })

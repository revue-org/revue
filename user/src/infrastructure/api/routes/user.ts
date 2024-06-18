import express, { Request, Response, Router } from 'express'
import { ContactFactory } from '@common/domain/factories/ContactFactory.js'
import { controller } from '@/infrastructure/api/controllers/user.js'
import { Contact } from '@common/domain/core/Contact.js'
import { ContactType } from '@common/domain/core/ContactType.js'
import { User } from '@/domain/core/User.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { UserId } from '@/domain/core/UserId.js'

export const userRouter: Router = express.Router()

userRouter.route('/').get((req: Request, res: Response): void => {
  controller
    .getUsers()
    .then((users: User[]): void => {
      res.status(HttpStatusCode.OK).send(users)
    })
    .catch((): void => {
      res.send({ error: 'No user found' })
    })
})

userRouter.route('/:id').get((req: Request, res: Response): void => {
  controller
    .getUserById(req.params.id)
    .then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
    .catch((): void => {
      res.send({ error: 'User not found' })
    })
})

userRouter.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const contacts: Contact[] = req.body.contacts.map((contact: { type: string; value: string }): Contact => {
    return contact.type === ContactType.EMAIL
      ? ContactFactory.createMailContact(contact.value)
      : ContactFactory.createSmsContact(contact.value)
  })
  controller
    .createUser(req.body.name, req.body.surname, req.body.mail, contacts)
    .then((id: UserId): void => {
      res.status(HttpStatusCode.CREATED).send({ success: id })
    })
    .catch((): void => {
      res.send({ error: 'User not created' })
    })
})

userRouter.route('/').put((req: Request, res: Response): void => {
  const contacts: Contact[] = req.body.contacts.map((contact: { type: string; value: string }): Contact => {
    return contact.type === ContactType.EMAIL
      ? ContactFactory.createMailContact(contact.value)
      : ContactFactory.createSmsContact(contact.value)
  })
  controller
    .updateUser(req.body.id, req.body.name, req.body.surname, contacts)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'User correctly updated' })
    })
    .catch((err): void => {
      console.log(err)
      res.send({ error: 'User not updated' })
    })
})

userRouter.route('/:id').delete((req: Request, res: Response): void => {
  controller
    .deleteUser(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'User correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'User not deleted' })
    })
})

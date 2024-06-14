import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { ContactFactory } from '@common/domain/factories/ContactFactory'
import { userController } from '@/infrastructure/api/controllers/user'
import { User } from '@/domain/core/User'
import { Contact } from 'common/dist/domain/core/Contact'
import { ContactType } from 'common/dist/domain/core/ContactType'

export const userRouter: Router = express.Router()

userRouter.route('/').get((req: Request, res: Response): void => {
  userController
    .getUsers()
    .then((users: User[]): void => {
      res.status(HttpStatusCode.OK).send(users)
    })
    .catch((): void => {
      res.send({ error: 'No user found' })
    })
})

userRouter.route('/:id').get((req: Request, res: Response): void => {
  userController
    .getUserById(req.params.id)
    .then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
    .catch((): void => {
      res.send({ error: 'User not found' })
    })
})

userRouter.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const contacts: Contact[] = req.body.contacts.map((contact: Contact) => {
    return contact.type === ContactType.EMAIL ? ContactFactory.createMailContact(contact.value) : ContactFactory.createSmsContact(contact.value)
  })
  userController
    .createUser(req.body.name, req.body.surname, req.body.mail, contacts)
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'User created' })
    })
    .catch((): void => {
      res.send({ error: 'User not created' })
    })
})

userRouter.route('/').put((req: Request, res: Response): void => {
  const contacts: Contact[] = req.body.contacts.map((contact: Contact) => {
    return contact.type === ContactType.EMAIL ? ContactFactory.createMailContact(contact.value) : ContactFactory.createSmsContact(contact.value)
  })
  userController
    .updateUser(UserFactory.idOf(req.body.taxCode), req.body.name, req.body.surname, req.body.mail, contacts)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'User correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'User not updated' })
    })
})

userRouter.route('/').delete((req: Request, res: Response): void => {
  userController
    .deleteUser(req.body.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'User correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'User not deleted' })
    })
})

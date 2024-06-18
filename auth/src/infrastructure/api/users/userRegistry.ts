import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { controller } from '@/infrastructure/api/controller/user.js'
import { UserFactory } from '@/domain/factories/UserFactory.js'
import { User } from '@/domain/core/User.js'
import { UserId } from '@/domain/core/UserId.js'

export const userRegistry: Router = express.Router()

userRegistry.route('/').get((req: Request, res: Response): void => {
  controller
    .getUsers()
    .then((token: any): void => {
      res.status(HttpStatusCode.OK).send(token)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send(err)
    })
})

userRegistry.route('/:id').get((req: Request, res: Response): void => {
  controller
    .getUserById(UserFactory.idOf(req.params.id))
    .then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send(err.message)
    })
})

userRegistry.route('/').post((req: Request, res: Response): void => {
  controller
    .createUser(req.body.username, req.body.password, req.body.permissions)
    .then((userId: UserId): void => {
      res.status(HttpStatusCode.CREATED).send(userId)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send(err)
    })
})

userRegistry.route('/').put((req: Request, res: Response): void => {
  controller
    .updateUser(UserFactory.idOf(req.body.id), req.body.permissions)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('User updated')
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send(err)
    })
})

userRegistry.route('/:id').delete((req: Request, res: Response): void => {
  controller
    .deleteUser(UserFactory.idOf(req.params.id))
    .then((): void => {
      res.status(HttpStatusCode.OK).send("User deleted")
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send(err)
    })
})

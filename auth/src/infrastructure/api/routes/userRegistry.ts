import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { controller } from '@/infrastructure/api/controllers/user.js'
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
    .getUserById(req.params.id)
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

userRegistry.route('/:id').put((req: Request, res: Response): void => {
  controller
    .updateUser(req.params.id, req.body.permissions)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('User updated')
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send(err)
    })
})

userRegistry.route('/:id').delete((req: Request, res: Response): void => {
  controller
    .deleteUser(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send("User deleted")
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.BAD_REQUEST).send(err)
    })
})

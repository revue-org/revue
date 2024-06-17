import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { controller } from "@/infrastructure/api/controller/user";
import { userAccess } from "@/infrastructure/api/users/userAccess";
import { UserFactory } from "@/domain/factories/UserFactory";
import { User } from "@/domain/core/User";
import { UserId } from "@/domain/core/UserId";

export const userRegistry: Router = express.Router()

userRegistry.route('/').get((req: Request, res: Response): void => {
  controller
    .refreshToken(req.body.refreshToken)
    .then((token: any): void => {
      res.status(HttpStatusCode.OK).send(token)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userRegistry.route('/:id').get((req: Request, res: Response): void => {
  controller.getUserById(UserFactory.idOf(req.body.id))
    .then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userRegistry.route('/').post((req: Request, res: Response): void => {
  controller
    .createUser(req.body.username, req.body.password, req.body.permissions)
    .then((userId: UserId): void => {
      res.status(HttpStatusCode.OK).send(userId)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userRegistry.route('/').put((req: Request, res: Response): void => {
  controller
    .updateUser(UserFactory.idOf(req.body.id), req.body.password, req.body.permissions)
    .then((token: any): void => {
      res.status(HttpStatusCode.OK).send(token)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userRegistry.route('/:id').delete((req: Request, res: Response): void => {
  controller
    .deleteUser(UserFactory.idOf(req.body.id))
    .then((res: any): void => {
      res.status(HttpStatusCode.OK).send(res)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

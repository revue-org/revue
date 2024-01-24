import express, { Request, Response, Router } from 'express'
import { User } from '@domain/monitoring/core/User.js'
import { userController } from '../controller/user.js'
import HttpStatusCode from "../utils/HttpStatusCode.js";

export const userRouter: Router = express.Router()

userRouter.route('/').get((req: Request, res: Response): void => {
  userController
    .getUsers()
    .then((users: User[]): void => {
      res.status(HttpStatusCode.OK).send(users)
    })
    .catch((err): void => {
      console.log(err)
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

userRouter.route('/').post((req: Request, res: Response): void => {
  userController
    .createUser(req)
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'User created' })
    })
    .catch((): void => {
      res.send({ error: 'User not created' })
    })
})

userRouter.route('/').put((req: Request, res: Response): void => {
  userController
    .updateUser(req)
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

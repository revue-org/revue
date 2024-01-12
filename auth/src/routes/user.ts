import express, { Request, Response, Router } from 'express'
import { User } from '@domain/monitoring/core/User.js'
import { userController } from '../controller/user.js'

export const userRouter: Router = express.Router()

userRouter.route('/').get((res: Response): void => {
  userController
    .getUsers()
    .then((users: User[]): void => {
      res.send(users)
    })
    .catch((): void => {
      res.send({ error: 'No user found' })
    })
})

userRouter.route('/:id').get((req: Request, res: Response): void => {
  userController
    .getUserById(req)
    .then((user: User): void => {
      res.send(user)
    })
    .catch((): void => {
      res.send({ error: 'User not found' })
    })
})

userRouter.route('/').post((req: Request, res: Response): void => {
  userController
    .createUser(req)
    .then((): void => {
      res.send({ success: 'User created' })
    })
    .catch(() => {
      res.send({ error: 'User not created' })
    })
})

userRouter.route('/').put((req: Request, res: Response): void => {
  userController
    .updateUser(req)
    .then((): void => {
      res.send({ success: 'User correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'User not updated' })
    })
})

userRouter.route('/').delete((req: Request, res: Response): void => {
  userController
    .deleteUser(req)
    .then((): void => {
      res.send({ success: 'User correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'User not deleted' })
    })
})

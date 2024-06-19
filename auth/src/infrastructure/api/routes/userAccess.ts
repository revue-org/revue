import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { accessController } from '@/infrastructure/api/controllers/userAccess.js'
import { User } from '@/domain/core/User'

export const userAccess: Router = express.Router()

userAccess.route('/login').post((req: Request, res: Response): void => {
  accessController
    .login(req.body.username, req.body.password)
    .then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
    .catch((err: Error): void => {
      console.log(err)
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userAccess.route('/logout').post((req: Request, res: Response): void => {
  if (req.headers['authorization'] === undefined)
    res.status(HttpStatusCode.UNAUTHORIZED).send('No authentication token')
  const token: string =
    req.headers['authorization'] === undefined ? '' : req.headers['authorization'].split(' ')[1]
  accessController
    .logout(token, req.body.username)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('User logged out')
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userAccess.route('/refresh').post((req: Request, res: Response): void => {
  accessController
    .refreshToken(req.body.refreshToken)
    .then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

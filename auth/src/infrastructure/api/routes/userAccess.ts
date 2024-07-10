import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { accessController } from '@/infrastructure/api/controllers/userAccess.js'
import { User } from '@/domain/core/User'
import { ZodUserAccessPresenter } from '@/presentation/api/impl/ZodUserAccessPresenter.js'
import { UserAccessPresenter } from '@/presentation/api/UserAccessPresenter'
import { Credentials, UserLogout } from '@/presentation/api/schemas/UserSchemas'

export const userAccess: Router = express.Router()
const userAccessPresenter: UserAccessPresenter = new ZodUserAccessPresenter()

userAccess.route('/login').post((req: Request, res: Response): void => {
  try {
    const loginMsg: Credentials = userAccessPresenter.parseCredentials(req.body)
    accessController.login(loginMsg.username, loginMsg.password).then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
  } catch (err) {
    res.status(HttpStatusCode.UNAUTHORIZED).send(err)
  }
})

userAccess.route('/logout').post((req: Request, res: Response): void => {
  if (req.headers['authorization'] === undefined)
    res.status(HttpStatusCode.UNAUTHORIZED).send('No authentication token')
  const token: string =
    req.headers['authorization'] === undefined ? '' : req.headers['authorization'].split(' ')[1]
  try {
    const logoutMsg: UserLogout = userAccessPresenter.parseLogout(req.body)
    accessController.logout(token, logoutMsg.username).then((): void => {
      res.status(HttpStatusCode.OK).send('User logged out')
    })
  } catch (err) {
    res.status(HttpStatusCode.UNAUTHORIZED).send(err)
  }
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

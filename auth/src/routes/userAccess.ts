import { userAccessController } from '../controller/userAccess.js'
import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '../utils/HttpStatusCode.js'
import console from 'console'

export const userAccessRouter: Router = express.Router()

userAccessRouter.route('/login').post((req: Request, res: Response): void => {
  userAccessController
    .login(req.body.username, req.body.password)
    .then((access: any): void => {
      res.status(HttpStatusCode.OK).send(access)
    })
    .catch((err): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userAccessRouter.route('/logout').post((req: Request, res: Response): void => {
  console.log(req.headers['authorization'] + 'sono in logout')
  if (req.headers['authorization'] === undefined)
    res.status(HttpStatusCode.UNAUTHORIZED).send('No authentication token')
  let token: string =
    req.headers['authorization'] === undefined ? '' : req.headers['authorization'].split(' ')[1]
  userAccessController
    .logout(token, req.body.username)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('User logged out')
    })
    .catch((err): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userAccessRouter.route('/newToken').post((req: Request, res: Response): void => {
  userAccessController
    .newToken(req.body.username, req.body.refreshToken)
    .then((token: any): void => {
      res.status(HttpStatusCode.OK).send(token)
    })
    .catch((err): void => {
      console.log(err)
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

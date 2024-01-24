import { userAccessController } from '../controller/userAccess.js'
import express, { Request, Response } from 'express'
import HttpStatusCode from "../utils/HttpStatusCode.js";

export const userAccessRouter = express.Router()

userAccessRouter.route('/login').post((req: Request, res: Response): void => {
  userAccessController
    .login(req.body.username, req.body.password)
    .then((access: any): void => {
      console.log(access)
      res.status(HttpStatusCode.OK).send(access)
    })
    .catch((err): void => {
      console.log(err)
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userAccessRouter.route('/logout').post((req: Request, res: Response): void => {
  userAccessController
    .logout(req.body.username)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('User logged out')
    })
    .catch((err): void => {
      res.status(500).send(err)
    })
})

userAccessRouter.route('/newToken').post((req: Request, res: Response): void => {
  userAccessController
    .newToken(req.body.username, req.body.refreshToken)
    .then((token): void => {
      //TODO to check al fly
      res.status(HttpStatusCode.OK).send(token)
    })
    .catch((err): void => {
      res.status(500).send(err)
    })
})

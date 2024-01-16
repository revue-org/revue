import { userAccessController } from '../controller/userAccess.js'
import express, { Request, Response } from 'express'

export const userAccessRouter = express.Router()

userAccessRouter.route('/login').post((req: Request, res: Response): void => {
  userAccessController
    .login(req.body.username, req.body.password)
    .then((): void => {
      res.status(200).send('User logged in')
    })
    .catch((err): void => {
      res.status(500).send(err)
    })
})

userAccessRouter.route('/logout').post((req: Request, res: Response): void => {
  userAccessController
    .logout(req.body.username)
    .then((): void => {
      res.status(200).send('User logged out')
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
      res.status(200).send(token)
    })
    .catch((err): void => {
      res.status(500).send(err)
    })
})

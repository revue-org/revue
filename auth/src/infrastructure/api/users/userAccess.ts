import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { controller } from "@/infrastructure/api/controller/user.js";
import { User } from "@/domain/core/User";
import * as console from "node:console";

export const userAccess: Router = express.Router()

userAccess.route('/login').post((req: Request, res: Response): void => {
  controller
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
  controller
    .logout(token, req.body.username)
    .then((): void => {
      res.status(HttpStatusCode.OK).send('User logged out')
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})

userAccess.route('/refresh').post((req: Request, res: Response): void => {
  controller
    .refreshToken(req.body.refreshToken)
    .then((user: User): void => {
      res.status(HttpStatusCode.OK).send(user)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})


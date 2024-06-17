import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { controller } from '@/infrastructure/api/controller/user.js'

export const userPermission: Router = express.Router()

userPermission.route('/').get((req: Request, res: Response): void => {
  controller
    .getPermissions()
    .then((permissions: string[]): void => {
      res.status(HttpStatusCode.OK).send(permissions)
    })
    .catch((err: Error): void => {
      res.status(HttpStatusCode.UNAUTHORIZED).send(err)
    })
})




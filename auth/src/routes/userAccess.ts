import { userAccessController } from '../controller/userAccess.js'
import express, { Request, Response } from 'express'

export const userAccessRouter = express.Router()

userAccessRouter.route('/login').post((req: Request, res: Response) => {
  userAccessController.login(req, res)
})

userAccessRouter.route('/logout').post((req: Request, res: Response) => {
  userAccessController.logout(req, res)
})

userAccessRouter.route('/newToken').post((req: Request, res: Response) => {
  userAccessController.newToken(req, res)
})

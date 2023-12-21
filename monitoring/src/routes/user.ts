import { userController } from '../controller/user.js'
import express, { Request, Response } from "express";

export const userRouter = express.Router()

userRouter.route('/').post((req: Request, res: Response) => {
  userController.createUser(req, res)
})

userRouter.route('/:id').get((req: Request, res: Response) => {
  userController.getUser(req, res)
})

userRouter.route('/').get((req: Request, res: Response) => {
  userController.getUsers(req, res)
})

userRouter.route('/').put((req: Request, res: Response) => {
  userController.updateUser(req, res)
})

userRouter.route('/').delete((req: Request, res: Response) => {
  userController.deleteUser(req, res)
})

import { userController } from '../controller/user.js'
import express from 'express'

export const userRouter = express.Router()

userRouter.route('/').post((req, res) => {
  userController.createUser(req, res)
})

userRouter.route('/').get((req, res) => {
  userController.getUsers(req, res)
})

userRouter.route('/:id').put((req, res) => {
  userController.getUser(req, res)
})

userRouter.route('/').put((req, res) => {
  userController.updateUser(req, res)
})

userRouter.route('/').delete((req, res) => {
  userController.deleteUser(req, res)
})

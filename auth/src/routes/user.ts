import { userController } from '../controller/user.js'
import express from 'express'

export const userRouter = express.Router()

userRouter.route('/login').post((req, res) => {
  userController.login(req, res)
})

userRouter.route('/logout')
  .post((req, res) => {
    userController.logout(req, res);
  })

userRouter.route('/newToken')
  .post((req, res) => {
    userController.newToken(req, res);
  })


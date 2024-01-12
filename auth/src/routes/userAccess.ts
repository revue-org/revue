import { userAccessController } from '../controller/userAccess.js'
import express from 'express'

export const userAccessRouter = express.Router()

userAccessRouter.route('/login').post((req, res) => {
  userAccessController.login(req, res)
})

userAccessRouter.route('/logout').post((req, res) => {
  userAccessController.logout(req, res)
})

userAccessRouter.route('/newToken').post((req, res) => {
  userAccessController.newToken(req, res)
})

import { userController } from '../controller/user.js'
import express from 'express'

export const userRouter = express.Router()

userRouter
  .route('/')
  .get((req, res) => {
    userController.getAllUsers(req, res)
  })
  .post((req, res) => {
    userController.createUser(req, res)
  })

userRouter
  .route('/:id')
  .get((req, res) => {
    userController.getUser(req, res)
  })
  .put((req, res) => {})
  .delete((req, res) => {})

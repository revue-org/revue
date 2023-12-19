import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema.js'
import { UserRepository } from 'domain/dist/domain/monitoring/repository/UserRepository.js'
import { UserRepositoryImpl } from 'domain/dist/storage/monitoring/UserRepositoryImpl.js'
import { User } from "domain/dist/domain/monitoring/core/User";

const userModel: Model<User> = model<User>('User', userSchema, 'user')
const userManager: UserRepository = new UserRepositoryImpl(userModel)

export const userController = {
  getUser: async (req: Request, res: Response) => {
    //da parsare l'utente dalla richiesta post
    console.log(req.params.id);
    res.send(req.params.id);
  },
  getUsers: async (req: Request, res: Response) => {
    //da parsare l'utente dalla richiesta post
  },
  createUser: async (req: Request, res: Response) => {
    //da parsare l'utente dalla richiesta post
  },
  updateUser: async (req: Request, res: Response) => {
    //da parsare l'utente dalla richiesta post
  },
  deleteUser: async (req: Request, res: Response) => {
    //da parsare l'utente dalla richiesta post
  }
}

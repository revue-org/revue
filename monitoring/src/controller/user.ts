import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import { userSchema } from '@storage/monitoring/schemas/UserSchema.js'
import { UserRepository } from '@domain/monitoring/repository/UserRepository.js'
import { UserRepositoryImpl } from '@storage/monitoring/UserRepositoryImpl.js'
import { User } from '@domain/monitoring/core/User.js'
import { UserFactory } from '@domain/monitoring/factories/UserFactory.js'
import { UserFactoryImpl } from '@domain/monitoring/factories/impl/UserFactoryImpl.js'

const userModel: Model<User> = model<User>('User', userSchema, 'user')
const userManager: UserRepository = new UserRepositoryImpl(userModel)
const userFactory: UserFactory = new UserFactoryImpl()

export const userController = {
  getUser: async (req: Request, res: Response) => {
    res.send(await userManager.getUserById(req.params.id));
  },
  getUsers: async (req: Request, res: Response) => {
    res.send(await userManager.getUsers());
  },
  createUser: async (req: Request, res: Response) => {


    /*
    *     id: string,
    name: string,
    surname: string,
    username: string,
    password: string,
    token: string,
    refreshToken: string,
    contact: Contact[],
    deviceIds: DeviceId[]*/



    //da parsare l'utente dalla richiesta post
    res.json(
      await userManager.insertUser(
        userFactory.createUser(deviceId, req.body.ipAddress, resolution)
      )
    )
    const user: User =
    userModel.create(req.body)
    res.send("createUser")
  },
  updateUser: async (req: Request, res: Response) => {
    //da parsare l'utente dalla richiesta post
    res.send("updateUser")
  },
  deleteUser: async (req: Request, res: Response) => {
    //da parsare l'utente dalla richiesta post
    res.send("deleteUser")
  }
}

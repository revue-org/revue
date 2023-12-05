import type { Request, Response } from 'express'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema'
import { MyMonitoringRepository } from 'domain/dist/storage/monitoring/MyMonitoringRepository'
import { Model, model } from 'mongoose'
import * as console from 'console'
import { UserImpl } from 'domain/dist/domain/monitoring/core/impl/UserImpl'
import bcrypt from 'bcryptjs'
import { jwtManager } from '../utils/JWTManager'

const userModel: Model<UserImpl> = model<UserImpl>('user', userSchema, 'user')
const userManager: MyMonitoringRepository = new MyMonitoringRepository(userModel)

export const userController = {
  login: async (req: Request, res: Response) => {
    try {
      const user: UserImpl = await userManager.getUser(req.body.username)

      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) return res.status(401).send('Wrong password')

      const infos = {
        id: user.id,
        username: user.username
      }
      user.token = jwtManager.generateAccessToken(infos)
      user.refreshToken = jwtManager.generateRefreshToken(infos)

      res.json(await userManager.updateUser(user))
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}

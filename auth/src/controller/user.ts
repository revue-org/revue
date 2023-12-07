import type { Request, Response } from 'express'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema'
import { MyMonitoringRepository } from 'domain/dist/storage/monitoring/MyMonitoringRepository'
import { Model, model } from 'mongoose'
import { UserImpl } from 'domain/dist/domain/monitoring/core/impl/UserImpl'
import bcrypt from 'bcryptjs'
import { jwtManager } from '../utils/JWTManager'
import { UserInfo } from '../utils/UserInfo'
import { User } from 'domain/dist/domain/monitoring/core/User'

const userModel: Model<UserImpl> = model<UserImpl>('UserImpl', userSchema, 'user')
const userManager: MyMonitoringRepository = new MyMonitoringRepository(userModel)

export const userController = {
  login: async (req: Request, res: Response) => {
    try {
      const user: UserImpl = await userManager.getUser(req.body.username)
      if (!user) return res.status(400).send('User not found')
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) return res.status(401).send('Wrong password')

      const infos: UserInfo = new UserInfo(user.id, user.username)
      user.token = jwtManager.generateAccessToken(infos)
      user.refreshToken = jwtManager.generateRefreshToken(infos)

      res.json(await userManager.updateUser(user))
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const user: UserImpl = await userManager.getUser(req.body.username)
      if (!user) return res.status(400).send('User not found')

      //TODO da aggiungere il controllo che guarda se l'utente che ha richiesto il logout è giusto o meno.
      //TODO controllando dai dati in req e dal token
      user.token = ''
      user.refreshToken = ''
      //console.log(req.headers["user"])
      await userManager.updateUser(user)
      res.status(200).send('Logout successful')
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  },

  newToken: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.body.refreshToken
      if (refreshToken == null) return res.status(401).send('Refresh token not valid')

      const user: UserImpl = await userManager.getUser(req.body.username)
      if (!user) return res.status(400).send('User not found')

      if (user.refreshToken != refreshToken) return res.status(401).send('Refresh token not valid')

      jwtManager.verify(refreshToken, async (err: Error, infos: UserInfo) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwtManager.generateAccessToken(infos)
        user.token = accessToken
        await userManager.updateUser(user)
        res.status(200).json({ accessToken: accessToken })
      })
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}

import type { Request, Response } from 'express'
import { model, Model } from "mongoose";
import bcrypt from 'bcryptjs'
import { jwtManager } from '../utils/JWTManager.js'
import { UserInfo } from '../utils/UserInfo.js'
import { UserRepositoryImpl } from '@storage/monitoring/UserRepositoryImpl.js'
import { UserRepository } from '@domain/monitoring/repository/UserRepository.js'
import { User } from "@domain/monitoring/core/User.js";
import { userSchema } from "@storage/monitoring/schemas/UserSchema.js";

const userModel: Model<User> = model<User>('User', userSchema, 'user')
const userManager: UserRepository = new UserRepositoryImpl(userModel)

export const userAccessController = {
  login: async (req: Request, res: Response) => {
    try {
      const user: User = await userManager.getUserByUsername(req.body.username)
      if (!user) return res.status(400).send('User not found')
      const match: boolean = await bcrypt.compare(req.body.password, user.password)
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
      const user: User = await userManager.getUserByUsername(req.body.username)
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

      const user: User = await userManager.getUserByUsername(req.body.username)
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

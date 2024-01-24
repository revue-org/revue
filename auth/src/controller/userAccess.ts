import { model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { jwtManager } from '../utils/JWTManager.js'
import { UserInfo } from '../utils/UserInfo.js'
import { UserRepositoryImpl } from '@storage/monitoring/UserRepositoryImpl.js'
import { UserRepository } from '@domain/monitoring/repository/UserRepository.js'
import { User } from '@domain/monitoring/core/User.js'
import { userSchema } from '@storage/monitoring/schemas/UserSchema.js'
import { userModel } from "./user.js";

//const userModel: Model<User> = model<User>('User', userSchema, 'user')
const userManager: UserRepository = new UserRepositoryImpl(userModel)

export const userAccessController = {
  login: async (username: string, password: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const user: User = await userManager.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    const match: boolean = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Wrong password')
    user.token = jwtManager.generateAccessToken({ id: user.id, username: user.username })
    user.refreshToken = jwtManager.generateRefreshToken({ id: user.id, username: user.username })
    await userManager.updateUser(user)
    return { accessToken: user.token, refreshToken: user.refreshToken }
  },

  logout: async (username: string): Promise<void> => {
    const user: User = await userManager.getUserByUsername(username)
    if (!user) throw new Error('User not found')

    //TODO da aggiungere il controllo che guarda se l'utente che ha richiesto il logout è giusto o meno.
    //TODO controllando dai dati in req e dal token
    user.token = ''
    user.refreshToken = ''
    return await userManager.updateUser(user)
  },

  newToken: async (username: string, refreshToken: string): Promise<void> => {
    if (refreshToken == null) throw new Error('Refresh token not valid')
    const user: User = await userManager.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    if (user.refreshToken != refreshToken) throw new Error('Refresh token not valid')
    jwtManager.verify(refreshToken, async (err: Error, infos: UserInfo) => {
      if (err) throw new Error('Error verifying token')
      const accessToken = jwtManager.generateAccessToken(infos)
      user.token = accessToken
      await userManager.updateUser(user)
      return accessToken
    })
  }
}

import bcrypt from 'bcryptjs'
import { jwtManager } from '../utils/JWTManager.js'
import { UserInfo } from '../utils/UserInfo.js'
import { User } from '@domain/monitoring/core/User.js'
import { UserService } from '@/application/services/UserService'
import { UserServiceImpl } from '@/application/services/UserServiceImpl'
import { MongoDBUserRepository } from '@/infrastructure/storage/MongoDBUserRepository'

const service: UserService = new UserServiceImpl(new MongoDBUserRepository())

export const userController = {
  login: async (
    username: string,
    password: string
  ): Promise<{ userId: string; accessToken: string; refreshToken: string }> => {
    const user: User = await service.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    const match: boolean = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Wrong password')
    const userInfo: UserInfo = { id: user.id, username: user.username }
    user.token = jwtManager.generateAccessToken(userInfo)
    user.refreshToken = jwtManager.generateRefreshToken(userInfo)
    service.updateUser(user)
    return { userId: user.id, accessToken: user.token, refreshToken: user.refreshToken }
  },

  logout: async (token: string, username: string): Promise<void> => {
    const user: User = await service.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    if (token !== user.token) throw new Error('Token not valid')
    user.token = ''
    user.refreshToken = ''
    return service.updateUser(user)
  },

  newToken: async (username: string, refreshToken: string): Promise<{ accessToken: string }> => {
    if (refreshToken == null) throw new Error('Refresh token not valid')
    const user: User = await service.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    if (user.refreshToken !== refreshToken) throw new Error('Refresh token not valid')
    let access: string = ''
    jwtManager.verify(refreshToken, async (err: Error, infos: UserInfo) => {
      if (err) throw new Error('Error verifying token')
      access = jwtManager.generateAccessToken(infos)
      user.token = access
      service.updateUser(user)
    })
    return { accessToken: access }
  }
}

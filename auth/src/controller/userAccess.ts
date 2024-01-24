import bcrypt from 'bcryptjs'
import { jwtManager } from '../utils/JWTManager.js'
import { UserInfo } from '../utils/UserInfo.js'
import { UserRepositoryImpl } from '@storage/monitoring/UserRepositoryImpl.js'
import { UserRepository } from '@domain/monitoring/repository/UserRepository.js'
import { User } from '@domain/monitoring/core/User.js'
import { userModel } from './user.js'
import console from 'console' //const userModel: Model<User> = model<User>('User', userSchema, 'user')

//const userModel: Model<User> = model<User>('User', userSchema, 'user')
const userManager: UserRepository = new UserRepositoryImpl(userModel)

export const userAccessController = {
  login: async (
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const user: User = await userManager.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    const match: boolean = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Wrong password')
    user.token = jwtManager.generateAccessToken({ id: user.id, username: user.username })
    user.refreshToken = jwtManager.generateRefreshToken({ id: user.id, username: user.username })
    await userManager.updateUser(user)
    return { accessToken: user.token, refreshToken: user.refreshToken }
  },

  logout: async (token: string, username: string): Promise<void> => {
    const user: User = await userManager.getUserByUsername(username)
    console.log(user)
    if (!user) throw new Error('User not found')
    console.log(token)
    console.log(user.token)
    if (token !== user.token) throw new Error('Token not valid')
    user.token = ''
    user.refreshToken = ''
    return await userManager.updateUser(user)
  },

  newToken: async (username: string, refreshToken: string): Promise<{ accessToken: string }> => {
    if (refreshToken == null) throw new Error('Refresh token not valid')
    const user: User = await userManager.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    if (user.refreshToken !== refreshToken) throw new Error('Refresh token not valid')
    let access: string = ''
    jwtManager.verify(refreshToken, async (err: Error, infos: UserInfo) => {
      if (err) throw new Error('Error verifying token')
      access = jwtManager.generateAccessToken(infos)
      user.token = access
      await userManager.updateUser(user)
      console.log('nuovo accessToken' + access)
    })
    return { accessToken: access }
  }
}

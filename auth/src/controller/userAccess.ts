import bcrypt from 'bcryptjs'
import { jwtManager } from '../utils/JWTManager.js'
import { UserInfo } from '../utils/UserInfo.js'
import { User } from '@domain/monitoring/core/User.js'
import { userService } from '../init.js'

export const userAccessController = {
  login: async (
    username: string,
    password: string
  ): Promise<{ userId: string; accessToken: string; refreshToken: string }> => {
    const user: User = await userService.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    const match: boolean = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Wrong password')
    user.token = jwtManager.generateAccessToken({ id: user.id, username: user.username })
    user.refreshToken = jwtManager.generateRefreshToken({ id: user.id, username: user.username })
    userService.updateUser(user)
    return { userId: user.id, accessToken: user.token, refreshToken: user.refreshToken }
  },

  logout: async (token: string, username: string): Promise<void> => {
    const user: User = await userService.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    if (token !== user.token) throw new Error('Token not valid')
    user.token = ''
    user.refreshToken = ''
    return userService.updateUser(user)
  },

  newToken: async (username: string, refreshToken: string): Promise<{ accessToken: string }> => {
    if (refreshToken == null) throw new Error('Refresh token not valid')
    const user: User = await userService.getUserByUsername(username)
    if (!user) throw new Error('User not found')
    if (user.refreshToken !== refreshToken) throw new Error('Refresh token not valid')
    let access: string = ''
    jwtManager.verify(refreshToken, async (err: Error, infos: UserInfo) => {
      if (err) throw new Error('Error verifying token')
      access = jwtManager.generateAccessToken(infos)
      user.token = access
      userService.updateUser(user)
    })
    return { accessToken: access }
  }
}

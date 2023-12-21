import mongoose, { Model } from 'mongoose'
import { User } from '../../domain/monitoring/core/User.js'
import { UserRepository } from '../../domain/monitoring/repository/UserRepository.js'

export class UserRepositoryImpl implements UserRepository {
  userModel: Model<User>

  constructor(model: Model<User>) {
    this.userModel = model
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().orFail()
  }

  async getUserById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: new mongoose.Types.ObjectId(userId) }).orFail()
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).orFail()
  }

  async insertUser(user: User): Promise<void> {
    await this.userModel.create({
      name: user.name,
      surname: user.surname,
      username: user.username,
      password: user.password,
      token: user.token,
      refreshToken: user.refreshToken,
      contact: user.contact,
      deviceIds: user.deviceIds
    }).catch((err) => {
      throw err
    })
  }

  async updateUser(user: User): Promise<void> {
    await this.userModel.updateOne({ _id: user.id }, user).orFail()
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: userId }).orFail()
  }
}

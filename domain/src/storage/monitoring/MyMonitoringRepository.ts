import { Model } from 'mongoose'
import { User } from '../../domain/monitoring/core/User'
import { MonitoringRepository } from '../../domain/monitoring/repository/MonitoringRepository'
import { UserImpl } from '../../domain/monitoring/core/impl/UserImpl'

export class MyMonitoringRepository implements MonitoringRepository {
  userModel: Model<UserImpl>

  constructor(model: Model<UserImpl>) {
    this.userModel = model
  }

  getAllUsers(): Set<User> {
    return new Set<UserImpl>()
  }

  async getUser(username: String): Promise<UserImpl> {
    console.log(await this.userModel.findOne({ username: username }) as unknown)// as unknown as UserImpl
    return this.userModel.findOne({ username: username }) as unknown as UserImpl
  }

  async updateUser(user: UserImpl): Promise<UserImpl> {
    return this.userModel
      .findOneAndUpdate(
        { _id: user.id },
        user,
        { new: true, useFindAndModify: false }
      ) as unknown as UserImpl
  }
}

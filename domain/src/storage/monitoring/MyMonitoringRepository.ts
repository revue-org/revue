import { Model } from 'mongoose'
import { User } from '../../domain/monitoring/core/User'
import { MonitoringRepository } from '../../domain/monitoring/repository/MonitoringRepository'

export class MyMonitoringRepository implements MonitoringRepository {
  userModel: Model<User>
  constructor(model: Model<User>) {
    this.userModel = model
  }

  getAllUsers(): Set<User> {
    return new Set<User>()
  }

  async getUser(username: String): Promise<User> {
    return this.userModel.find({ username: username }) as unknown as User
  }
}

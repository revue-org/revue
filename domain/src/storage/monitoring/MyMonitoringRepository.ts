import { Model } from 'mongoose'
import { User } from '../../domain/monitoring/core/User.js'
import { MonitoringRepository } from '../../domain/monitoring/repository/MonitoringRepository.js'
import { UserImpl } from '../../domain/monitoring/core/impl/UserImpl.js'

export class MyMonitoringRepository implements MonitoringRepository {
  userModel: Model<User>

  constructor(model: Model<User>) {
    this.userModel = model
  }

  getAllUsers(): Set<User> {
    return new Set<User>()
  }

}

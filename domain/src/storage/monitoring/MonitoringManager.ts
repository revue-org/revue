import { User } from '../../domain/monitoring/core/User'
import { MonitoringRepository } from '../../domain/monitoring/repository/MonitoringRepository'
import { userModel } from './schemas/UserSchema'

export class MonitoringManager implements MonitoringRepository {
  getAllUsers(): Set<User> {
    return userModel.find()
  }
}

import { User } from '../core/User.js'

export interface MonitoringRepository {
  getAllUsers(): Set<User>
}

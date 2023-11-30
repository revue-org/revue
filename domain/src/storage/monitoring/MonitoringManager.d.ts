import { User } from '../../domain/monitoring/core/User'
import { MonitoringRepository } from '../../domain/monitoring/repository/MonitoringRepository'
export declare class MonitoringManager implements MonitoringRepository {
  getAllUsers(): Set<User>
}

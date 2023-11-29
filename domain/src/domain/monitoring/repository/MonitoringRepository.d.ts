import { User } from '../core/User';
export interface MonitoringRepository {
    getAllUsers(): Set<User>;
}

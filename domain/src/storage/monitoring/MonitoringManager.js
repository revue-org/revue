import { User } from "../../domain/monitoring/core/User";
import { MonitoringRepository } from "../../domain/monitoring/repository/MonitoringRepository";
import { userModel } from "./schemas/UserSchema";
export class MonitoringManager {
    getAllUsers() {
        return userModel.find();
    }
}

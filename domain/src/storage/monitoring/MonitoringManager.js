import { userModel } from './schemas/UserSchema';
export class MonitoringManager {
    getAllUsers() {
        return userModel.find();
    }
}

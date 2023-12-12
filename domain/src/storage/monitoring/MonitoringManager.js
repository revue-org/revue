import { userSchema } from './schemas/UserSchema.js'

export class MonitoringManager {
  getAllUsers() {
    return userSchema.find()
  }
}

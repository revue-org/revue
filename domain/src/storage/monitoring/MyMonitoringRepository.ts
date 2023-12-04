import { Model } from "mongoose";
import { User } from "../../domain/monitoring/core/User";
import { MonitoringRepository } from "../../domain/monitoring/repository/MonitoringRepository";
import { UserImpl } from "../../domain/monitoring/core/impl/UserImpl";

export class MyMonitoringRepository implements MonitoringRepository {

  userModel: Model<UserImpl>;
  constructor(model: Model<UserImpl>) {
    this.userModel = model;
  }

  getAllUsers(): Set<User> {
    return new Set<UserImpl>();
  }

  async getUser(username: String): Promise<UserImpl> {
    return this.userModel.findOne({ username: username }) as unknown as UserImpl;
  }

  updateUser(user: UserImpl): void {
    console.log("ci passo, ma non va")
    console.log(user)

    this.userModel.findByIdAndUpdate(user.id, user, { new: true });
  }
}

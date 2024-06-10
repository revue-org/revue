import mongoose, { Model } from 'mongoose'
import { User } from '../../domain/monitoring/core/User.js'
import { UserRepository } from '../../domain/monitoring/repositories/UserRepository.js'
import { ContactTypeConverter } from '../../utils/ContactTypeConverter.js'
import { DeviceTypeConverter } from '../../utils/DeviceTypeConverter.js'
import { Contact } from '../../domain/monitoring/core/Contact.js'
import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { UserId } from "@/domain/core/UserId";

export class MongoDBUserRepository implements UserRepository {
  userModel: Model<User>

  constructor(model: Model<User>) {
    this.userModel = model
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().orFail()
  }

  async getUserById(userId: UserId): Promise<User> {
    return this.userModel.findOne({ _id: new mongoose.Types.ObjectId(userId) }).orFail()
  }

  async insertUser(user: User): Promise<void> {
    await this.userModel
      .create({
        id: user.id,
        name: user.name,
        surname: user.surname,
        mail: user.mail,
        contacts: user.contacts.map((contact: Contact) => {
          return {
            type: ContactTypeConverter.convertToString(contact.type),
            value: contact.value.toString()
          }
        })
      })
      .catch((err): void => {
        throw err
      })
  }

  async updateUser(user: User): Promise<void> {
    await this.userModel.updateOne({ _id: user.id }, user).orFail()
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: userId }).orFail()
  }
}

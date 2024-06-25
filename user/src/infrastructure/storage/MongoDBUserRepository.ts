import mongoose from 'mongoose'
import { userSchema } from './schemas/UserSchema.js'
import { UserDBAdapter, UserDBEntity } from '@/infrastructure/storage/models/UserModel.js'
import { UserRepository } from '@/application/repositories/UserRepository.js'
import { UserId } from '@/domain/core/UserId.js'
import { User } from '@/domain/core/User.js'

export class MongoDBUserRepository implements UserRepository {
  private model = mongoose.model<UserDBEntity>('UserSchema', userSchema, 'user')

  async getUsers(): Promise<User[]> {
    return this.model
      .find()
      .lean()
      .then(users => {
        return users.map(user => UserDBAdapter.asDomainEntity(user))
      })
  }

  async getUserById(userId: UserId): Promise<User> {
    const user = await this.model
      .findOne({
        id: userId.value
      })
      .lean()
    if (!user) {
      throw new Error('User not found')
    }
    return UserDBAdapter.asDomainEntity(user)
  }

  async saveUser(user: User): Promise<void> {
    await this.model.create(UserDBAdapter.asDBEntity(user))
  }

  async updateUser(user: User): Promise<void> {
    await this.model.updateOne(
      {
        id: user.id.value
      },
      UserDBAdapter.asDBEntity(user)
    )
  }

  async removeUser(userId: UserId): Promise<void> {
    await this.model.deleteOne({ id: userId.value })
  }
}

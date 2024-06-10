import { model, Model } from 'mongoose'
import { UserService } from 'domain/dist/application/monitoring/UserService.js'
import { UserServiceImpl } from 'domain/dist/application/monitoring/impl/UserServiceImpl.js'
import { User } from 'domain/dist/domain/monitoring/core/User.js'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema.js'
import { UserRepository } from 'domain/dist/domain/monitoring/repositories/UserRepository.js'
import { UserRepositoryImpl } from 'domain/dist/storage/monitoring/MongoDBUserRepository.js'

export const userModel: Model<User> = model<User>('User', userSchema, 'user')

const userRepository: UserRepository = new UserRepositoryImpl(userModel)

export const userService: UserService = new UserServiceImpl(userRepository)

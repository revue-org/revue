import { model, Model } from 'mongoose'
import { User } from 'domain/dist/domain/monitoring/core/User.js'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema.js'
import { UserService } from "@/application/services/UserService";
import { UserServiceImpl } from "@/application/services/UserServiceImpl";
import { UserRepository } from "@/application/repositories/UserRepository";

export const userModel: Model<User> = model<User>('User', userSchema, 'user')

const userRepository: UserRepository = new UserRepositoryImpl(userModel)

export const userService: UserService = new UserServiceImpl(userRepository)

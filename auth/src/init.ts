import { model, Model } from 'mongoose'
import { UserService } from 'domain/dist/application/monitoring/UserService.js'
import { UserServiceImpl } from 'domain/dist/application/monitoring/impl/UserServiceImpl.js'
import { User } from "domain/dist/domain/monitoring/core";
import { userSchema } from "domain/dist/storage/monitoring/schemas/UserSchema";
import { UserRepository } from "domain/dist/domain/monitoring/repositories/UserRepository";
import { UserRepositoryImpl } from "domain/dist/storage/monitoring/UserRepositoryImpl";

export const userModel: Model<User> = model<User>('User', userSchema, 'user')

const userRepository: UserRepository = new UserRepositoryImpl(userModel)

export const userService: UserService = new UserServiceImpl(userRepository)

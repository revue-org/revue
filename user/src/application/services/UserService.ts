import { User } from '@/domain/core/User.js'
import { UserId } from "@/domain/core/UserId";
import { Contact } from "common/dist/domain/core/Contact";

export interface UserService {
  getUsers(): Promise<User[]>

  getUserById(id: UserId): Promise<User>

  createUser(name: string, surname: string, mail: string, contacts: Contact[]): Promise<UserId>

  updateUser(id: UserId, name: string, surname: string, contacts: Contact[]): Promise<void>

  deleteUser(id: UserId): Promise<void>
}

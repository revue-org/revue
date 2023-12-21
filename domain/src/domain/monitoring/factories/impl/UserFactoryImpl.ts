import { UserFactory } from '../UserFactory'
import { Contact } from "../../core/Contact";
import { User } from "../../core/User";
import { UserImpl } from "../../core/impl/UserImpl";
import { DeviceId } from "../../../device/core/DeviceId";

export class UserFactoryImpl implements UserFactory {
  createUser(
    id: string,
    name: string,
    surname: string,
    username: string,
    password: string,
    token: string,
    refreshToken: string,
    contact: Contact[],
    deviceIds: DeviceId[]
  ): User {
    return new UserImpl(
      id,
      name,
      surname,
      username,
      password,
      token,
      refreshToken,
      contact,
      deviceIds
    )
  }
}

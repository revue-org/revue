import { User } from '../User.js'
import { Contact } from '../Contact.js'
import { DeviceId } from '../../../device/core/DeviceId.js'

export class UserImpl implements User {
  private _id: string
  private _name: string
  private _surname: string
  private _username: string
  private _password: string
  private _token: string
  private _refreshToken: string
  private _contacts: Contact[]
  private _deviceIds: DeviceId[]

  constructor(
    id: string,
    name: string,
    surname: string,
    username: string,
    password: string,
    token: string,
    refreshToken: string,
    contacts: Contact[],
    deviceIds: DeviceId[]
  ) {
    this._id = id
    this._name = name
    this._surname = surname
    this._username = username
    this._password = password
    this._token = token
    this._refreshToken = refreshToken
    this._contacts = contacts
    this._deviceIds = deviceIds
  }

  get id(): string {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get surname(): string {
    return this._surname
  }

  set surname(surname: string) {
    this._surname = surname
  }

  get username(): string {
    return this._username
  }

  set username(username: string) {
    this._username = username
  }

  get password(): string {
    return this._password
  }

  set password(password: string) {
    this._password = password
  }

  get token(): string {
    return this._token
  }

  set token(token: string) {
    this._token = token
  }

  get refreshToken(): string {
    return this._refreshToken
  }

  set refreshToken(refreshToken: string) {
    this._refreshToken = refreshToken
  }

  get contacts(): Contact[] {
    return this._contacts
  }

  set contacts(contacts: Contact[]) {
    this._contacts = contacts
  }

  get deviceIds(): DeviceId[] {
    return this._deviceIds
  }

  set deviceIds(devices: DeviceId[]) {
    this._deviceIds = devices
  }

  addDevice(device: DeviceId) {
    this._deviceIds.push(device)
  }
}

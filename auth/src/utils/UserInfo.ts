export class UserInfo {
  private readonly _id: string
  private readonly _username: string

  constructor(id: string, username: string) {
    this._id = id
    this._username = username
  }

  get id(): string {
    return this._id
  }

  get username(): string {
    return this._username
  }
}

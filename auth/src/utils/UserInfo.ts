export class UserInfo {
  private readonly _id: number
  private readonly _username: string

  constructor(id: number, username: string) {
    this._id = id
    this._username = username
  }

  get id(): number {
    return this._id
  }

  get username(): string {
    return this._username
  }
}

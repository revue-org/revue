export type Credentials = {
  username: string
  password: string
}

export type UserLogout = {
  username: string
}

export type UserInsertion = {
  username: string
  password: string
  permissions: string[]
}

export type UserUpdate = {
  permissions: string[]
}

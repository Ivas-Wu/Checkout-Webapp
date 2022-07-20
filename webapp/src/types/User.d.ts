export type User = {
  id: Number,
  firstName?: String,
  lastName?: String,
  email: String,
  familySize?: Number,
  active: Boolean
}

export type UserCreateReq = {
  firstName?: String,
  lastName?: String,
  email: String,
  familySize?: Number,
  active?: Boolean
}

export type UserUpdateReq = {
  firstName?: String,
  lastName?: String,
  email?: String,
  familySize?: Number,
  active?: Boolean
}
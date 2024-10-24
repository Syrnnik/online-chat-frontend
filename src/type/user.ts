import { WithId } from "type/withId"

export type User = {
  username: string
  password?: string
}

export type UserCreate = {
  user: User & { password: string }
}

export type UserUpdate = {
  user: WithId<User> & { password?: string }
}

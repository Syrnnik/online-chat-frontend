import { axiosClient } from "api/axiosClient"
import { User } from "type/user"
import { WithId } from "type/withId"

export const getCurrentUser = async (): Promise<WithId<User>> => {
  const { data: user } = await axiosClient.get("/user/current/")
  return user
}

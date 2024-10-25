import { axiosClient } from "api/axiosClient"
import { MessageCreate } from "type/message"

export const createMessage = async (body: MessageCreate) => {
  return await axiosClient.post("/message/", body)
}

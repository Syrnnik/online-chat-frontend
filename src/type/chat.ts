import { ApiRequest } from "type/api"
import { Message } from "type/message"
import { User } from "type/user"
import { WithId } from "type/withId"

export type ChatType = "private" | "group"

export type Chat = {
  type: ChatType
  user_count: number
  users: WithId<User>[]
}

export type ChatWithMessages = Chat & {
  count: number
  messages: WithId<Message>[]
}

export type ChatWithMessagesRequest = ApiRequest<{
  chat_id: number
}>

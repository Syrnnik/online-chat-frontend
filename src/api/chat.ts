import { axiosClient } from "api/axiosClient"
import { Chat, ChatWithMessages, ChatWithMessagesRequest } from "type/chat"
import { WithId } from "type/withId"

export const getAllChats = async (): Promise<WithId<Chat>[]> => {
  const { data: chat } = await axiosClient.get("/chat/")
  return chat
}

export const getChatWithMessages = async (
  body: ChatWithMessagesRequest,
): Promise<WithId<ChatWithMessages>> => {
  const { data: chatWithMessages } = await axiosClient.post(`/chat/id/`, body)
  return chatWithMessages
}

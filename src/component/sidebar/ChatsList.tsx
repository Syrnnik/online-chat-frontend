import { Flex, Text } from "@chakra-ui/react"
import { getAllChats } from "api/chat"
import { Loader } from "component/Loader"
import { ChatItem } from "component/sidebar/ChatItem"
import { FC } from "react"
import { useQuery } from "react-query"
import { Chat } from "type/chat"
import { WithId } from "type/withId"

export const ChatsList: FC = () => {
  const {
    data: chatsList,
    isLoading,
    isError,
  } = useQuery<WithId<Chat>[]>("chatsList", getAllChats)
  const isChatsExists = chatsList !== undefined

  if (isLoading) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Loader />
      </Flex>
    )
  }

  if (isError) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Text>Cannot load your chats :(</Text>
      </Flex>
    )
  }

  if (!isChatsExists) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Text>You do not have any chat yet</Text>
      </Flex>
    )
  }

  return (
    <Flex
      h="full"
      w="full"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      overflowY="auto"
    >
      {chatsList.map((chat, index) => (
        <ChatItem key={index} chat={chat} />
      ))}
    </Flex>
  )
}

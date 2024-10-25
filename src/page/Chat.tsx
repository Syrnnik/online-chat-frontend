import { Flex, Text } from "@chakra-ui/react"
import { getChatWithMessages } from "api/chat"
import { queryClient } from "api/queryClient"
import { MessageInput } from "component/chat/MessageInput"
import { MessagesList } from "component/chat/MessagesList"
import { Loader } from "component/Loader"
import { DEFAULT_MESSAGES_LIMIT } from "constant/messages"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { ChatWithMessages } from "type/chat"
import { Message } from "type/message"
import { User } from "type/user"
import { WithId } from "type/withId"

type ChatParams = {
  id: string
}

const limit = DEFAULT_MESSAGES_LIMIT

export const Chat: FC = () => {
  const { id } = useParams<ChatParams>()
  const chatId = Number(id)

  // const [limit, setLimit] = useState<number>(DEFAULT_MESSAGES_LIMIT)
  const [offset, setOffset] = useState<number>(0)

  const loadAndSaveNewMessages = async (
    updatedChat: WithId<ChatWithMessages>,
  ) => {
    const queryKey = ["chat", chatId]

    // Cancel chat queries to not rewrite all messages
    queryClient.cancelQueries(queryKey)

    if (!updatedChat) {
      return
    }

    const loadedUsers = updatedChat.users
    const loadedMessages = updatedChat.messages

    setUsersList(loadedUsers)
    setMessagesList((prevMessages) => [...loadedMessages, ...prevMessages])
  }

  const {
    data: chat,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery<WithId<ChatWithMessages>>(
    ["chat", chatId],
    () =>
      getChatWithMessages({
        limit,
        offset,
        chat_id: chatId,
      }),
    {
      enabled: !!chatId,

      onSuccess: loadAndSaveNewMessages,
    },
  )
  const isChatExists = chat !== undefined
  const allMessagesCount = chat?.count

  const [usersList, setUsersList] = useState<WithId<User>[]>([])
  const [messagesList, setMessagesList] = useState<WithId<Message>[]>([])

  const isAllMessagesLoaded = messagesList.length === allMessagesCount

  const handleLoadMoreMessages = () => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + limit

      if (allMessagesCount) {
        if (newOffset >= allMessagesCount) {
          return prevOffset
        }

        return newOffset
      }

      return prevOffset
    })
  }

  useEffect(() => {
    refetch()
  }, [refetch, offset])

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
        <Text>Cannot load your messages :(</Text>
      </Flex>
    )
  }

  if (!isChatExists) {
    return (
      <Flex h="full" w="full" justifyContent="center" alignItems="center">
        <Text>This chat has no messages..</Text>
      </Flex>
    )
  }

  return (
    <Flex
      bgColor="gray.900"
      h="full"
      w="full"
      direction="column"
      justifyContent="flex-end"
    >
      {/* TODO: add chat header */}

      <MessagesList
        users={usersList}
        messages={messagesList}
        offset={offset}
        onLoadMoreMessages={handleLoadMoreMessages}
        isMoreMessagesLoading={isLoading}
        isMoreMessagesLoaded={isSuccess}
        isAllMessagesLoaded={isAllMessagesLoaded}
      />

      <MessageInput chatId={chatId} />
    </Flex>
  )
}

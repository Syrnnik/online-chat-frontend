import { Flex } from "@chakra-ui/react"
import { MessageItem } from "component/chat/MessageItem"
import { FC, useEffect, useRef, useState } from "react"
import { Message } from "type/message"
import { User } from "type/user"
import { WithId } from "type/withId"

interface MessagesListProps {
  users: WithId<User>[]
  messages: WithId<Message>[]
  onLoadMoreMessages: () => void
  offset: number
  isMoreMessagesLoading: boolean
  isMoreMessagesLoaded: boolean
  isAllMessagesLoaded: boolean
}

export const MessagesList: FC<MessagesListProps> = (props) => {
  const {
    users,
    messages,
    onLoadMoreMessages,
    offset,
    isMoreMessagesLoading,
    isMoreMessagesLoaded,
    isAllMessagesLoaded,
  } = props

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const [lastScrollHeight, setLastScrollHeight] = useState<number>()

  const isNeedScrollToBottom = offset === 0

  const handleLoadMoreMessages = async () => {
    if (isAllMessagesLoaded) {
      return
    }

    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight } = chatContainerRef.current

      if (scrollTop === 0) {
        onLoadMoreMessages()
        setLastScrollHeight(scrollHeight)
      }
    }
  }

  useEffect(() => {
    if (isNeedScrollToBottom) {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [isNeedScrollToBottom, messages])

  useEffect(() => {
    requestAnimationFrame(() => {
      if (
        chatContainerRef.current &&
        lastScrollHeight &&
        isMoreMessagesLoaded &&
        !isMoreMessagesLoading
      ) {
        const { scrollTop, scrollHeight } = chatContainerRef.current

        chatContainerRef.current.scrollTop =
          scrollTop + (scrollHeight - lastScrollHeight)
      }
    })
  }, [lastScrollHeight, isMoreMessagesLoaded, isMoreMessagesLoading])

  return (
    <Flex
      ref={chatContainerRef}
      h="full"
      w="full"
      direction="column"
      justifyContent="flex-start"
      overflowX="hidden"
      overflowY="auto"
      flexGrow="1"
      onScroll={handleLoadMoreMessages}
    >
      <Flex
        w="full"
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        px={6}
        py={2}
        gap={3}
        flexGrow="1"
      >
        {messages.map((message, index) => (
          <MessageItem key={index} users={users} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Flex>
    </Flex>
  )
}

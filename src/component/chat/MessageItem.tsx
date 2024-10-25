import { Avatar, Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Message } from "type/message"
import { User } from "type/user"
import { WithId } from "type/withId"

interface MessageItemProps {
  users: WithId<User>[]
  message: WithId<Message>
}

export const MessageItem: FC<MessageItemProps> = (props) => {
  const { users, message } = props

  const sentByUserId = message.user_id

  const sender = users.find((user) => user.id === sentByUserId)
  const content = message.content
  const sentAt = new Date(message.sent_at)
  const sentAtAsString = sentAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Flex w="full" alignItems="center" gap={2}>
      <Avatar name={sender?.username} />

      <Flex w="full" gap={1}>
        {/* Content */}
        <Text fontSize="lg" alignSelf="center" py={1} pr={2}>
          {content}
        </Text>

        {/* Sent Time */}
        <Text fontSize="sm" color="gray" alignSelf="flex-end">
          {sentAtAsString}
        </Text>
      </Flex>
    </Flex>
  )
}

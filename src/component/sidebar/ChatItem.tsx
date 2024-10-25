import { Avatar, Flex, Link, Text } from "@chakra-ui/react"
import { useUserContext } from "context/user"
import { FC } from "react"
import { Chat } from "type/chat"
import { WithId } from "type/withId"

interface ChatItemProps {
  chat: WithId<Chat>
}

export const ChatItem: FC<ChatItemProps> = (props) => {
  const { chat } = props

  const chatId = chat.id

  const { currentUser } = useUserContext()

  const currentUserName = currentUser?.username

  const users = chat.users
  const otherUser = users.find((user) => user.id !== currentUser?.id)
  const otherUserName = otherUser?.username

  const avatarText = `${currentUserName} ${otherUserName}`

  // Soft redirect to chat
  // const handleChatClick = () => {
  //   window.history.pushState({}, "", `/chat/${chatId}`)
  // }

  return (
    <Link
      w="full"
      href={`/chat/${chatId}`}
      // onClick={handleChatClick}
      // Prevent text underlining
      _hover={{ textDecoration: "none" }}
    >
      <Flex
        // bgColor="red"
        w="full"
        direction="row"
        alignItems="center"
        px={4}
        py={3}
        gap={3}
      >
        <Avatar name={avatarText} />

        <Flex
          h="full"
          w="full"
          direction="column"
          justifyContent="center"
          gap={2}
        >
          <Text fontWeight="semibold" textDecoration="none">
            {otherUserName}
          </Text>

          {/* TODO: show part of last message from chat */}
        </Flex>
      </Flex>
    </Link>
  )
}

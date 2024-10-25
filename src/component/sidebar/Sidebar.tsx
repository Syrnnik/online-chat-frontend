import { Flex } from "@chakra-ui/react"
import { ChatsList } from "component/sidebar/ChatsList"
import { FC } from "react"

export const Sidebar: FC = () => {
  return (
    <Flex
      w="30%"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      borderRightWidth={1}
      borderRightColor="gray.700"
    >
      <ChatsList />
    </Flex>
  )
}

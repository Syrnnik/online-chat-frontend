import { Flex, IconButton, Textarea } from "@chakra-ui/react"
import { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import { FaPaperPlane } from "react-icons/fa"
import { useMessageCreateMutation } from "service/message"
import { MessageCreate } from "type/message"

interface MessageInputProps {
  chatId: number
}

export const MessageInput: FC<MessageInputProps> = (props) => {
  const { chatId } = props

  const [message, setMessage] = useState<string>("")

  const isSendBtnDisabled = !message.trim()

  const messageCreateMutation = useMessageCreateMutation()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)
  }

  const handleClear = () => {
    setMessage("")
  }

  const handleMessageSend = async () => {
    const body: MessageCreate = {
      chat_id: chatId,
      content: message,
    }

    await messageCreateMutation.mutateAsync(body)
  }

  const handleSendBtnClick = () => {
    setMessage((prevMessage) => prevMessage.trim())
    handleClear()

    handleMessageSend()
  }

  const handleSendKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isSendBtnDisabled) {
      // Prevent other event handlers
      e.preventDefault()

      console.log("Message sent:", e.currentTarget.value)
      handleSendBtnClick()
    }
  }

  return (
    <Flex
      bgColor="var(--chakra-colors-chakra-body-bg)"
      minH="15%"
      w="full"
      direction="row"
    >
      <Textarea
        minH="full"
        // w="full"
        border="none"
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        alignSelf="flex-end"
        px={5}
        py={4}
        placeholder="Write your message.."
        resize="none"
        value={message}
        onChange={handleChange}
        onKeyDown={handleSendKeyDown}
      />

      <Flex
        h="full"
        w="fit-content"
        direction="column"
        justifyContent="flex-start"
        pr={2}
        py={1}
      >
        <IconButton
          // h="full"
          w="fit-content"
          aria-label="send-message-btn"
          icon={<FaPaperPlane />}
          variant="ghost"
          fontSize={20}
          // p={3}
          py={5}
          onClick={handleSendBtnClick}
          isDisabled={isSendBtnDisabled}
        />
      </Flex>
    </Flex>
  )
}

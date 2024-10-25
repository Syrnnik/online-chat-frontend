import { createMessage } from "api/message"
import { queryClient } from "api/queryClient"
import { useMutation } from "react-query"

export const useMessageCreateMutation = () => {
  return useMutation(createMessage, {
    onSuccess: (_, body) => {
      queryClient.invalidateQueries(["chat", body.chat_id])
    },
  })
}

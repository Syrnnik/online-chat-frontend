import { queryClient } from "api/queryClient"
import { createContext, useContext, useEffect } from "react"
import { FCC } from "type/fcc"
import { getWebSocketBaseUrl } from "util/urls"
import { getUserToken } from "util/userToken"

interface WebSocketContextProps {
  // sendText: (message: string) => void
}

export const WebSocketContext = createContext<
  WebSocketContextProps | undefined
>(undefined)

const webSocketUrl = getWebSocketBaseUrl()

export const WebSocketContextProvider: FCC = (props) => {
  const { children } = props

  useEffect(
    () => {
      const token = getUserToken()

      const ws = new WebSocket(webSocketUrl)
      // ws.send(JSON.stringify({ token }))

      ws.onmessage = (event) => {
        const message = event.data

        switch (message) {
          case "purchase":
            queryClient.invalidateQueries("purchasesList")
            break
        }
      }

      return () => {
        ws.close()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient],
  )

  return (
    <WebSocketContext.Provider
      value={
        {
          // sendText,
        }
      }
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error(
      "useWebSocketContext must be used in WebSocketContextProvider",
    )
  }

  return context
}

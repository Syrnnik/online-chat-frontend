import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { AppRouter } from "component/AppRouter"
import { appTheme } from "theme"

export const App = () => {
  return (
    <ChakraProvider theme={appTheme}>
      <ColorModeScript />

      <AppRouter />
    </ChakraProvider>
  )
}

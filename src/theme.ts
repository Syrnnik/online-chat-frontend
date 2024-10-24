import { extendTheme } from "@chakra-ui/react"

export const appTheme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: true,

  semanticTokens: {
    colors: {
      primary: "red.300",
      // text: {
      //   default: "gray.900",
      //   _dark: "gray.50",
      // },
    },
  },
})

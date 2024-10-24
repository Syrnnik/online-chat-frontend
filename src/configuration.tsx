import { SignIn } from "page/SignIn"
import { SignUp } from "page/SignUp"
import { getApiBaseUrl, getWebSocketBaseUrl } from "util/urls"

type Route = {
  index?: boolean
  type: "main" | "child" | "side"
  name: string
  path: string
  component?: JSX.Element
  isDisabled?: boolean
}

export const configuration = {
  version: "v0.0.1",
  isDevEnv: process.env.NODE_ENV === "development",
  sidebarItems: [
    //* Side pages
    // Sign In
    {
      type: "side",
      name: "Sign In",
      path: "/sign-in",
      component: <SignIn />,
    },
    // Sign Up
    {
      type: "side",
      name: "Sign Up",
      path: "/sign-up",
      component: <SignUp />,
    },
  ] as Route[],
  urls: {
    apiBaseUrl: getApiBaseUrl(),
    webSocketBaseUrl: getWebSocketBaseUrl(),
  },
}

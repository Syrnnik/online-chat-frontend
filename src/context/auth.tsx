import { signIn as signInReq, signUp as signUpReq } from "api/auth"
import { queryClient } from "api/queryClient"
import { createContext, useContext, useState } from "react"
import { FCC } from "type/fcc"
import { clearUserToken, getUserToken, setUserToken } from "util/userToken"

interface AuthContextProps {
  isAuthenticated: boolean
  signIn: (username: string, password: string) => Promise<void>
  signUp: (username: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
)

export const AuthContextProvider: FCC = (props) => {
  const { children } = props

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!getUserToken(),
  )

  const updateUserAuthToken = (accessToken: string) => {
    setUserToken(accessToken)
    setIsAuthenticated(true)
    queryClient.invalidateQueries("currentUser")
  }

  const signIn = async (username: string, password: string) => {
    const token = await signInReq(username, password)
    updateUserAuthToken(token.access_token)
  }

  const signUp = async (username: string, password: string) => {
    const token = await signUpReq(username, password)
    updateUserAuthToken(token.access_token)
  }

  const signOut = () => {
    clearUserToken()
    setIsAuthenticated(false)
    queryClient.invalidateQueries("currentUser")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext must be used in AuthContextProvider")
  }

  return context
}

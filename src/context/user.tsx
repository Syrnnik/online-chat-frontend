import { getCurrentUser } from "api/user"
import { createContext, useContext } from "react"
import { useQuery } from "react-query"
import { FCC } from "type/fcc"
import { User } from "type/user"
import { WithId } from "type/withId"

interface UserContextProps {
  currentUser?: WithId<User>
  isUserAdmin?: boolean
  isLoadingCurrentUser: boolean
}

export const UserContext = createContext<UserContextProps>({
  isLoadingCurrentUser: true,
})

export const UserContextProvider: FCC = (props) => {
  const { children } = props

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery<
    WithId<User>
  >("currentUser", getCurrentUser)

  const isLoading = isLoadingCurrentUser

  // const isUserAdmin = userRoles.includes(ADMIN_ROLE)

  return (
    <UserContext.Provider
      value={{
        currentUser,
        // isUserAdmin,
        isLoadingCurrentUser: isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUserContext must be used in UserContextProvider")
  }

  return context
}

import { Button, Flex, useColorMode } from "@chakra-ui/react"
import { axiosClient } from "api/axiosClient"
import { AxiosError } from "axios"
import { useAuthContext } from "context/auth"
import { FC, useEffect } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

export const AppLayout: FC = () => {
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()

  const { colorMode, toggleColorMode } = useColorMode()

  const handleColorModeChange = () => {
    console.log(`Color mode was: ${colorMode}`)
    toggleColorMode()
  }

  useEffect(() => {
    const checkServer = async () => {
      try {
        await axiosClient.get("/healthcheck")
      } catch (error) {
        if (error instanceof AxiosError) {
          navigate("/maintenance", {
            state: { from: location },
          })
        }
      }
    }

    checkServer()
  }, [location, navigate])

  if (isAuthenticated) {
    return (
      <Flex h="full" w="full" bgColor="appLayout" direction="row">
        {/* TODO: add sidebar with chats */}
        {/* <Sidebar /> */}
        <Flex position="absolute" top={5} right={5}>
          <Button onClick={handleColorModeChange}>Toggle Color Mode</Button>
        </Flex>

        <Outlet />
      </Flex>
    )
  }

  return <Navigate to="/auth" state={{ from: location }} />
}

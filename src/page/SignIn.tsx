import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import { useAuthContext } from "context/auth"
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  MouseEvent,
  useState,
} from "react"
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import { notify } from "util/toasts"

export const SignIn = () => {
  const { signIn } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const passwordInputType: HTMLInputTypeAttribute = isPasswordVisible
    ? "text"
    : "password"
  const passwordVisibilityIcon = isPasswordVisible ? <FiEyeOff /> : <FiEye />

  const isSubmitBtnDisabled = !username || !password || isError || isLoading

  const fromPage =
    (location.state as { from: { pathname: string } })?.from?.pathname || "/"

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.trim()
    setUsername(username)
    setIsError(false)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value.trim()
    setPassword(password)
    setIsError(false)
  }

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible)
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (username && password && !isError) {
      try {
        await signIn(username, password)

        navigate(fromPage)
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            notify("Wrong login or password", "error")
          }
        }

        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Flex h="full" w="full" justifyContent="center" alignItems="center">
      {/* Sign In Form */}
      <Flex direction="column" gap={5}>
        <Flex w="full" justifyContent="center">
          <Heading size="xl">Sign In</Heading>
        </Flex>

        <Flex direction="column" gap={5}>
          {/* Username Input */}
          <InputGroup>
            <InputLeftElement color="gray">
              <FiUser />
            </InputLeftElement>

            <Input
              type="text"
              placeholder="Login"
              value={username}
              onChange={handleUsernameChange}
              disabled={isLoading}
            />
          </InputGroup>

          {/* Password Input */}
          <InputGroup>
            <InputLeftElement color="gray">
              <FiLock />
            </InputLeftElement>

            <Input
              type={passwordInputType}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              isDisabled={isLoading}
            />

            {/* Password Visibility Btn */}
            <InputRightElement>
              <IconButton
                aria-label="password-visibility"
                variant="ghost"
                colorScheme="gray"
                color="bodyText"
                icon={passwordVisibilityIcon}
                onClick={handlePasswordVisibilityChange}
                isDisabled={isLoading}
              />
            </InputRightElement>
          </InputGroup>

          {/* Sign In Btn */}
          <Button
            w="full"
            colorScheme="red"
            type="submit"
            onClick={handleSubmit}
            isDisabled={isSubmitBtnDisabled}
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </Flex>

        {/* Url to Sign Up */}
        <Flex w="full" justifyContent="center">
          <Text>
            Do not have account??{" "}
            <Link href="/sign-up" color="primary">
              Sign up
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

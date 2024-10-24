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
import { isPasswordConfirmed } from "util/validation"

export const SignUp = () => {
  const { signUp } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const passwordInputType: HTMLInputTypeAttribute = isPasswordVisible
    ? "text"
    : "password"
  const passwordVisibilityIcon = isPasswordVisible ? <FiEyeOff /> : <FiEye />

  const isPasswordConfirmInvalid = !isPasswordConfirmed(
    password,
    passwordConfirm,
  )
  const isSubmitBtnDisabled =
    !username ||
    !password ||
    !passwordConfirm ||
    isPasswordConfirmInvalid ||
    isError ||
    isLoading

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

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordConfirm = e.target.value.trim()
    setPasswordConfirm(passwordConfirm)
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
        await signUp(username, password)

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
          <Heading size="xl">Sign Up</Heading>
        </Flex>

        <Flex direction="column" gap={5}>
          {/* Username Input */}
          <InputGroup>
            <InputLeftElement color="gray">
              <FiUser />
            </InputLeftElement>

            <Input
              type="text"
              name="username"
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
              name="password"
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

          {/* Password Confirm Input */}
          <InputGroup>
            <InputLeftElement color="gray">
              <FiLock />
            </InputLeftElement>

            <Input
              type={passwordInputType}
              name="password-confirm"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              isInvalid={isPasswordConfirmInvalid}
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

          {/* Sign Up Btn */}
          <Button
            w="full"
            colorScheme="red"
            type="submit"
            onClick={handleSubmit}
            isDisabled={isSubmitBtnDisabled}
            isLoading={isLoading}
          >
            Sign up
          </Button>
        </Flex>

        {/* Url to Sign In */}
        <Flex w="full" justifyContent="center">
          <Text>
            Already have account??{" "}
            <Link href="/sign-in" color="primary">
              Sign in
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

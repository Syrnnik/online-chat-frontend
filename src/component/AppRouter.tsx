import { queryClient } from "api/queryClient"
import { AppLayout } from "component/AppLayout"
import { configuration } from "configuration"
import { AuthContextProvider } from "context/auth"
import { UserContextProvider } from "context/user"
// import { UserContextProvider } from "context/user"
import { WebSocketContextProvider } from "context/websocket"
import { QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export const AppRouter = () => {
  const mainPages = configuration.sidebarItems.filter(
    ({ type, component }) => (type === "main" || type === "child") && component,
  )
  const sidePages = configuration.sidebarItems.filter(
    ({ type, component }) => type === "side" && component,
  )

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <WebSocketContextProvider>
          <AuthContextProvider>
            <Routes>
              {sidePages.map(({ name, path, component }) => (
                <Route key={name} path={path} element={component} />
              ))}
            </Routes>

            <UserContextProvider>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  {mainPages.map(
                    ({ name, index = false, path, component, isDisabled }) =>
                      !isDisabled && (
                        <Route
                          key={name}
                          index={index}
                          path={path}
                          element={component}
                        />
                      ),
                  )}
                </Route>
              </Routes>
            </UserContextProvider>
          </AuthContextProvider>
        </WebSocketContextProvider>
      </QueryClientProvider>

      <ToastContainer />
    </BrowserRouter>
  )
}

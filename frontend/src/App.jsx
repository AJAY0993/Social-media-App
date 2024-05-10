import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

import Layout from "./components/Layout/Layout"
import Redirect from "./components/Redirect/Redirect"
import ProtectRoute from "./components/ProtectRoute/ProtectRoute"
import Loader from "./components/Loader/Loader"

const Landing = lazy(() => import("./pages/Landing/Landing"))
const Login = lazy(() => import("./pages/Login/Login"))
const Signup = lazy(() => import("./pages/Signup/Signup"))
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
)
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"))
const Home = lazy(() => import("./pages/Home/Home"))
const Explore = lazy(() => import("./pages/Explore/Explore"))
const Bookmarks = lazy(() => import("./pages/Bookmarks/Bookmarks"))
const Conversations = lazy(() => import("./pages/Conversations/Conversations"))
const Call = lazy(() => import("./pages/Call/Call"))
const PageForEachChat = lazy(() => import("./pages/MessageBox/PageForEachChat"))
const Profile = lazy(() => import("./pages/Profile/Profile"))
const PageNotFound = lazy(() => import("./pages/404/PageNotFound"))

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ProtectRoute>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Redirect>
                    <Landing />
                  </Redirect>
                }
              />
              <Route
                path="/login"
                element={
                  <Redirect>
                    <Login />
                  </Redirect>
                }
              />
              <Route
                path="/signup"
                element={
                  <Redirect>
                    <Signup />
                  </Redirect>
                }
              />
              <Route
                path="/forgotPassword"
                element={
                  <Redirect>
                    <ForgotPassword />
                  </Redirect>
                }
              />
              <Route
                path="/resetPassword/:resetPasswordToken"
                element={
                  <Redirect>
                    <ResetPassword />
                  </Redirect>
                }
              />
              <Route path="/" element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/messages" element={<Conversations />} />
                <Route path="/call" element={<Call />} />
                <Route
                  path="/messages/:recieverId"
                  element={<PageForEachChat />}
                />
                <Route path="/profile/:userId" element={<Profile />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </ProtectRoute>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          gutter: 8,
          duration: 3000,
          error: {
            duration: 5000
          }
        }}
      />
    </QueryClientProvider>
  )
}

export default App

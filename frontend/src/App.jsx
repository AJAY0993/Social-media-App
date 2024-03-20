import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { lazy, useEffect } from "react"
import Landing from "./pages/Landing/Landing"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile"
import Conversations from "./pages/Conversations/Conversations"
import MessageBox from "./pages/MessageBox/MessageBox"
import Layout from "./components/Layout/Layout"
import Redirect from "./components/Redirect/Redirect"
import Bookmarks from "./pages/Bookmarks/Bookmarks"
import ProtectRoute from "./components/ProtectRoute/ProtectRoute"
import ResetPassword from "./pages/ResetPassword/ResetPassword"

// const Home = lazy(() => import("./pages/Home/Home"))
// const Profile = lazy(() => import("./pages/Profile/Profile"))
// const Conversations = lazy(() => import("./pages/Conversations/Conversations"))
// const MessageBox = lazy(() => import("./pages/MessageBox/MessageBox"))
// const Bookmarks = lazy(() => import("./pages/Bookmarks/Bookmarks"))

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ProtectRoute>
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
              <Route path="/home" element={<Home />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/messages" element={<Conversations />} />
              <Route path="/messages/:recieverId" element={<MessageBox />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
          </Routes>
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

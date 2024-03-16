import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
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
import { fetchMyProfile } from "./services/userApi"
import { useDispatch } from "react-redux"
import { login } from "./reducer/userSlice"
import toast, { Toaster } from "react-hot-toast"
import Loader from "./components/Loader/Loader"
import Bookmarks from "./pages/Bookmarks/Bookmarks"

// const router = createBrowserRouter([
//   {
//     path: "/",
//     children: [
//       {
//         index: true,
//         element: (
//           <Redirect>
//             <Landing />
//           </Redirect>
//         )
//       },
//       {
//         path: "login",
//         element: (
//           <Redirect>
//             <Login />
//           </Redirect>
//         ),
//         action: loginAction
//       },
//       {
//         path: "signup",
//         element: (
//           <Redirect>
//             <Signup />
//           </Redirect>
//         ),
//         action: signUpAction
//       },
//       {
//         path: "forgotPassword",
//         element: <ForgotPassword />
//       },
//       {
//         element: <Layout />,
//         children: [
//           {
//             path: "home",
//             element: <Home />,
//             // loader: homeLoader,
//             action: homeAction
//           },
//           {
//             path: "profile/:userId",
//             element: <Profile />,
//             loader: profileLoader
//           },
//           {
//             path: "/messages",
//             element: <Conversations />,
//             loader: conversationLoader
//           },
//           {
//             path: "/messages/:recieverId",
//             element: <MessageBox />
//           }
//         ]
//       }
//     ]
//   }
// ])

function App() {
  const dispatch = useDispatch()
  const queryClient = new QueryClient()
  const [isChecking, setIsChecking] = useState(true)
  useEffect(() => {
    ;(async () => {
      try {
        const profile = await fetchMyProfile()
        dispatch(login(profile))
        setIsChecking(false)
      } catch (err) {
        setIsChecking(false)
        toast.error(err.response.data.message)
      }
    })()
  })
  if (isChecking) return <Loader />
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/messages" element={<Conversations />} />
            <Route path="/messages/:recieverId" element={<MessageBox />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Routes>
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

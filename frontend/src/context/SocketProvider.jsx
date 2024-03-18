import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
// import io from "socket.io-client"
import {
  getIsAuthenticated,
  getUser,
  setOnlineUsers
} from "../reducer/userSlice"
const socketContext = createContext()
const url = import.meta.env.DEV
  ? "http://localhost:3000/"
  : window.location.origin

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const user = useSelector(getUser)

  useEffect(() => {
    const socket = io(url, {
      query: { userId: user?._id }
    })
    socket.on("event:onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers))
    })
    setSocket(socket)
    return () => socket.disconnect()
  }, [isAuthenticated, user?._id, dispatch])

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  )
}

const useSocket = () => {
  const socket = useContext(socketContext)
  return socket
}

export { useSocket, SocketProvider }

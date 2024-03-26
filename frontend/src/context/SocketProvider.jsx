import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
// import io from "socket.io-client"
import {
  getIsAuthenticated,
  getUser,
  incrementMessageCount,
  setOnlineUsers
} from "../reducer/userSlice"
import { useParams } from "react-router-dom"
const socketContext = createContext()
const url = import.meta.env.DEV
  ? "http://localhost:3000/"
  : window.location.origin

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const { recieverId } = useParams()
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

    socket.on("event:message", (message) => {
      if (recieverId !== message.sender) {
        dispatch(incrementMessageCount(message.sender))
      }
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

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
const url = "http://localhost:3000"

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const user = useSelector(getUser)

  useEffect(() => {
    if (!isAuthenticated) {
      return console.log("Not logged in")
    } else {
      const socket = io(url, {
        query: { userId: user._id }
      })
      socket.on("event:onlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })
      setSocket(socket)
    }
  }, [isAuthenticated])

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

import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client"
import Peer from "peerjs"
// import io from "socket.io-client"
import {
  getIsAuthenticated,
  getUser,
  incrementMessageCount,
  setOnlineUsers
} from "../reducer/userSlice"
import { cutCall, getIsOnCall, reset, setCall } from "../reducer/peerSlice"
import toast from "react-hot-toast"

const getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia

const socketContext = createContext()
const url = import.meta.env.DEV
  ? "http://localhost:3000/"
  : window.location.origin

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [setSockets] = useState({})
  const [peer, setPeer] = useState(null)
  const [peers, setPeers] = useState({})
  const { recieverId } = useParams()
  const navigate = useNavigate()
  const { _id } = useSelector(getUser)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const user = useSelector(getUser)
  useEffect(() => {
    const socket = io(url, {
      query: { userId: user?._id }
    })
    socket.on("connected", console.log("User connected to socket"))

    socket.on("event:onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers))
    })

    socket.emit("event:getSockets", () => {
      socket.on("event:getSockets", (sockets) => setSockets(sockets))
    })

    socket.on("event:message", (message) => {
      if (recieverId !== message.sender) {
        dispatch(incrementMessageCount(message.sender))
      }
    })

    socket.on("event:getPeers", (userIdToPeerIdMap) => {
      setPeers(userIdToPeerIdMap)
    })

    socket.on("event:callRejected", () => {
      toast.error("Your call got rejected")
    })

    setSocket(socket)
    return () => socket.disconnect()
  }, [isAuthenticated, user?._id, dispatch])

  useEffect(() => {
    if (!socket) return
    const peer = new Peer(socket.id)
    peer.on("open", (id) => {
      socket.emit("event:addPeer", id)
      setPeer(peer)
    })
    peer.on("call", function (call) {
      const accepted = confirm(
        "Someone is calling you Do you want to pick up the call?"
      )

      console.log(accepted)
      if (accepted) {
        getUserMedia(
          { video: true, audio: true },
          function (stream) {
            call.answer(stream) // Answer the call with an A/V stream.
            call.on("stream", function (remoteStream) {
              console.log("Successfully called")
              // 1.) Set on Call Status true

              console.log("Dispatched setIsOnCall")
              // 2.) Set remote stream and My stream
              // 2.5) create video element
              const remoteVideo = document.createElement("video")
              remoteVideo.srcObject = remoteStream
              remoteVideo.autoplay = true
              document.querySelector("#call-box").appendChild(remoteVideo)
              // 3.) Navigate to call Page
              navigate("/call")

              // 4.) Set a listener on close event
              call.on("close", () => {
                alert("Call finished")
                remoteVideo.remove()
                stream.getTracks().forEach(function (track) {
                  track.stop()
                })
                dispatch(cutCall())
                navigate("/", { replace: true })
              })
            })
          },
          function (err) {
            console.log(err)
            call.close()
            socket.emit("event:callRejected", "username")
          }
        )
      }
      if (!accepted) {
        call.close()
        dispatch(reset())
        alert("You rejected call")
        dispatch(cutCall())
        socket.emit("event:callRejected", _id)
      }
    })
  }, [socket])

  return (
    <socketContext.Provider value={{ socket, peer, peers }}>
      {children}
    </socketContext.Provider>
  )
}

const useSocket = () => {
  const socket = useContext(socketContext)
  return socket
}

export { useSocket, SocketProvider }

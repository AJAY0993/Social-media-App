import { IoVideocam } from "react-icons/io5"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getOnlineUsers } from "../../reducer/userSlice"
import { useSocket } from "../../context/SocketProvider"
import { useNavigate } from "react-router-dom"
import { acceptCall, cutCall, getIsOnCall } from "./../../reducer/peerSlice"
import Button from "../Button/Button"

const getUserMedia =
  navigator.mediaDevices.getUserMedia ||
  navigator.mediaDevices.webkitGetUserMedia ||
  navigator.mediaDevices.mozGetUserMedia

function CallButon({ userId }) {
  const dispatch = useDispatch()
  const { setRemoteStream, socket } = useSocket()
  const isOnCall = useSelector(getIsOnCall)
  const navigate = useNavigate()
  const { peer, peers } = useSocket()
  const onlinesUsers = useSelector(getOnlineUsers)
  const isOnline = onlinesUsers.includes(userId)
  console.log(onlinesUsers, userId)
  const handleCall = async () => {
    if (!isOnline) {
      return toast.error("User is offline can not call right now")
    }
    try {
      const stream = await getUserMedia({ video: true, audio: true })
      const call = peer.call(peers[userId], stream)
      console.log("Peer Id:", peers[userId])
      dispatch(acceptCall(call))
      navigate("/call")
      call.on("stream", function (remoteStream) {
        setRemoteStream(remoteStream)
      })
      call.on("close", () => {
        toast("Call finished", { icon: "ℹ️" })
        dispatch(cutCall())
        stream.getTracks().forEach(function (track) {
          track.stop()
        })
        navigate("/")
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      type="primary"
      variation="square"
      onClick={handleCall}
      disabled={isOnCall}
    >
      <IoVideocam />
    </Button>
  )
}

export default CallButon

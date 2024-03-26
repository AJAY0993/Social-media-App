import { onMessage } from "firebase/messaging"
import { useEffect } from "react"
import { getToken } from "firebase/messaging"
import { useDispatch, useSelector } from "react-redux"
import { getIsAuthenticated } from "./../../reducer/userSlice"
import { messaging } from "../../services/firebase"
import { toast } from "react-hot-toast"
import { updateProfile } from "../../services/userApi"
import { useParams } from "react-router-dom"

function Firebase({ children }) {
  const { recieverId } = useParams()
  const vapidKey =
    "BBh5eRCMFJKWFakavct4hV_CHdGbaaJ8ar2AgXR8VacwgYQk0NBuwrj-kwPVWqOlDBL58GvDTQyzFzy8A19aRk0"
  const isAuthenticated = useSelector(getIsAuthenticated)
  async function requestPermission() {
    if (!isAuthenticated) return
    //requesting permission using Notification API
    const permission = await Notification.requestPermission()

    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey
        })

        const data = {
          firebaseToken: token
        }
        await updateProfile(data)
      } catch (err) {
        console.log(err)
      }
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification")
    }
  }

  useEffect(() => {
    const audio = new Audio("/audio/notif.mp3")
    requestPermission()
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log(payload.data)
      if (
        payload.data.type === "newMessage" &&
        payload.data.sender !== recieverId
      ) {
        toast.success(payload.data.title + ": " + payload.data.body, {
          icon: "💬"
        })
      } else {
        toast.success(payload.data.body, { icon: "📬" })
      }
      audio.play()
    })
    return unsubscribe
  }, [])

  return <>{children}</>
}

export default Firebase

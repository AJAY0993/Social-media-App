import { useState } from "react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "../utils/axios"

function useSendMessage() {
  const [isSending, setIsSending] = useState()
  const { recieverId } = useParams()
  async function sendMessage(message) {
    try {
      setIsSending(true)
      const res = await axios("messages", {
        method: "POST",
        data: {
          recieverId,
          message
        }
      })
      const newMessage = res.data.data.message
      setIsSending(false)
      return newMessage
    } catch (err) {
      toast.error(err.response.data.message)
      setIsSending(false)
    }
  }
  return { sendMessage, isSending }
}

export default useSendMessage

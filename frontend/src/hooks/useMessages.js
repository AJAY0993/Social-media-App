import { useSelector } from "react-redux"
import { getUserId } from "../reducer/userSlice"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "../utils/axios"

function useMessages() {
  const { recieverId } = useParams()
  const { data: messages, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios(`conversations/to?reciever=${recieverId}`)
        const messages = res.data.data.messages
        return messages
      } catch (error) {
        throw new Error(error.response.data.message)
      }
    },
    queryKey: [`messages:${recieverId}`]
  })
  return { messages, isLoading }
}

export default useMessages

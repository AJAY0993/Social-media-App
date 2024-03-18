import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "../utils/axios"

function useMessages() {
  const { recieverId } = useParams()
  const { data: messages, isFetchingMessages } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios(`conversations/to?reciever=${recieverId}`)
        const conversation = res.data.data
        return conversation.messages
      } catch (error) {
        return []
      }
    },
    queryKey: [`messages:${recieverId}`]
  })
  return { messages, isFetchingMessages }
}

export default useMessages

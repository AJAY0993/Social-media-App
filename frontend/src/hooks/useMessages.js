import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "../utils/axios"

function useMessages() {
  const { recieverId } = useParams()
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios(`conversations/to?reciever=${recieverId}`)
        const conversation = res.data.data
        return {
          previousMessages: conversation.messages,
          reciever: conversation.reciever
        }
      } catch (error) {
        throw new Error(error.response.data.message)
      }
    },
    queryKey: [`messages:${recieverId}`]
  })
  return { data, isLoading }
}

export default useMessages

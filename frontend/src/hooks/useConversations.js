import { useQuery } from "@tanstack/react-query"
import { fetchMyConversations } from "../services/conversationAndMessagingApi"

function useConversations() {
  const { data: conversations, isLoading: isFetcgingConversations } = useQuery({
    queryFn: fetchMyConversations,
    queryKey: ["conversations"]
  })
  return { conversations, isFetcgingConversations }
}

export default useConversations

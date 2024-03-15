import { useQuery } from "@tanstack/react-query"
import { fetchUserFollowers } from "../services/userApi"
import { useParams } from "react-router-dom"

function useFollowers() {
  const { userId } = useParams()
  const { data: followers, isLoading } = useQuery({
    queryFn: () => fetchUserFollowers(userId),
    queryKey: [`${userId}:followers`]
  })
  return { followers, isLoading }
}

export default useFollowers

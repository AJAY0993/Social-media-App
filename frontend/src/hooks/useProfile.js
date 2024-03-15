import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchProfile } from "../services/userApi"

function useProfile() {
  const { userId } = useParams()
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryFn: () => fetchProfile(userId),
    queryKey: [`user:${userId}`]
  })
  return { profile, isProfileLoading }
}

export default useProfile

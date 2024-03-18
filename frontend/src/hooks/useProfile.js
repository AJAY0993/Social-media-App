import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchProfile } from "../services/userApi"

function useProfile() {
  const { userId, recieverId } = useParams()
  const {
    data: profile,
    isLoading: isProfileLoading,
    error
  } = useQuery({
    queryFn: () => fetchProfile(userId || recieverId),
    queryKey: [`user:${userId}`]
  })
  return { profile, isProfileLoading, error }
}

export default useProfile

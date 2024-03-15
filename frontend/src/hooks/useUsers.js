import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../services/userApi"

function useUsers() {
  const { data: users, isLoading } = useQuery({
    queryFn: fetchUsers,
    queryKey: ["users"]
  })
  return { users, isLoading }
}

export default useUsers

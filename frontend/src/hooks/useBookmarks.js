import { useQuery } from "@tanstack/react-query"
import { fetchBookmarks } from "../services/userApi"

function useBookmarks() {
  const { data: bookmarks, isLoading: isFetchingBookmarks } = useQuery({
    queryFn: fetchBookmarks,
    queryKey: ["bookmarks"]
  })
  return { bookmarks, isFetchingBookmarks }
}

export default useBookmarks

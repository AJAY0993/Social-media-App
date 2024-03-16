import { useQuery } from "@tanstack/react-query"
import { fetchPostComments } from "../services/postApi"

function useComments(postId) {
  const { data: comments, isLoading } = useQuery({
    queryFn: () => fetchPostComments(postId),
    queryKey: [`comments:${postId}`]
  })
  return { comments, isLoading }
}

export default useComments

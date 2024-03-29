import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchPosts } from "../services/postApi"

function usePosts() {
  const {
    data,
    isFetching,
    isPending,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (page) => page.nextPage || null
  })

  return {
    data,
    isPending,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  }
}
export default usePosts

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost as deletePostApi } from "../services/postApi"
import { useSelector } from "react-redux"
import { getUserId } from "./../reducer/userSlice"
import { toast } from "react-hot-toast"

function usePostDelete() {
  const userId = useSelector(getUserId)
  const queryClient = useQueryClient()
  const {
    mutate: deletePost,
    isPending: isDeleting,
    error
  } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success(
        "Post deleted successfully changes will reflected on next reload or refresh"
      ),
        queryClient.invalidateQueries({
          queryKey: [`user:${userId}`]
        })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { deletePost, isDeleting, error }
}

export default usePostDelete

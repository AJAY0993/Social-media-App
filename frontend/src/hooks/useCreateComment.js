import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createComment as createCommentApi } from "../services/postApi"

function useCreateComment() {
  const queryClient = useQueryClient()
  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: (newComment) => {
      toast.success("Comment craeted successfully")
      queryClient.invalidateQueries({
        queryKey: [`comments:${newComment.post}`]
      })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { createComment, isCreating }
}

export default useCreateComment

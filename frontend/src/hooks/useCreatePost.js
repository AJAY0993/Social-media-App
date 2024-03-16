import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost as createPostApi } from "../services/postApi"
import toast from "react-hot-toast"

export default function useCreatePost() {
  const queryClient = useQueryClient()
  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      toast.success("Post created successfully"),
        queryClient.invalidateQueries({
          queryKey: ["posts"]
        })
    },
    onError: (err) => toast.error(err.message)
  })
  return { createPost, isCreating }
}

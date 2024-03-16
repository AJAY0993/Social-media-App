import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { likePost as likePostApi } from "../services/postApi"
import { toast } from "react-hot-toast"
import { updateLikedPosts } from "../reducer/userSlice"

function useLike() {
  const dispatch = useDispatch()
  dispatch
  const { mutate: like, isPending: isLiking } = useMutation({
    mutationFn: likePostApi,
    onSuccess: (data) => {
      toast.success(
        `${data.liked ? "Post liked" : "Post removed from liked"} successfully `
      )
      dispatch(updateLikedPosts(data.likedPosts))
    }
  })

  return { like, isLiking }
}

export default useLike

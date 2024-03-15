import { useMutation, useQueryClient } from "@tanstack/react-query"
import { unFollow as unFollowApi } from "../services/userApi"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getUserId, removeFollowing } from "../reducer/userSlice"

function useUnFollow() {
  const queryClient = useQueryClient()
  const userId = useSelector(getUserId)
  const dispatch = useDispatch()
  const { mutate: unFollow, isLoading: isUnFollowing } = useMutation({
    mutationFn: (userToUnFollow) => unFollowApi(userToUnFollow),
    onSuccess: () => {
      toast.success("Unfollowed successfully")
      queryClient.invalidateQueries({
        queryKey: [`user:${userId}`]
      })
      dispatch(removeFollowing(userId))
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { unFollow, isUnFollowing }
}
export default useUnFollow

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { follow as followApi } from "./../services/userApi"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { addFollowing, getUserId } from "../reducer/userSlice"

function useFollow() {
  const userId = useSelector(getUserId)
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate: follow, isLoading: isFollowing } = useMutation({
    mutationFn: (userToFollow) => followApi(userToFollow),
    onSuccess: () => {
      toast.success("Followed successfully"),
        queryClient.invalidateQueries({
          queryKey: [`user:${userId}`]
        })
      dispatch(addFollowing(userId))
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { follow, isFollowing }
}

export default useFollow

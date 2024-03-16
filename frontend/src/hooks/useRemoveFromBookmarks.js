import { useDispatch } from "react-redux"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { removeFromBookmarks as removeFromBookmarksReducer } from "../reducer/userSlice"
import { removeFromBookmarks as removeFromBookmarksApi } from "./../services/userApi"

function useRemoveFromBookmarks() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate: removeFromBookmarks, isPending: isRemoving } = useMutation({
    mutationFn: removeFromBookmarksApi,
    onSuccess: (data) => {
      toast.success("Successfully removed from bookmarks"),
        queryClient.invalidateQueries({
          queryKey: ["bookmarks"]
        })
      dispatch(removeFromBookmarksReducer(data))
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { removeFromBookmarks, isRemoving }
}

export default useRemoveFromBookmarks

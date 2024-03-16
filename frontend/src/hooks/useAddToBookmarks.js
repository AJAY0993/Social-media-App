import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToBookmarks as addToBookmarksApi } from "../services/userApi"
import { addToBookMarks as addToBookMarksReducer } from "../reducer/userSlice"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

function useAddToBookMarks() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate: addToBookmarks, isPending: isAdding } = useMutation({
    mutationFn: addToBookmarksApi,
    onSuccess: (data) => {
      toast.success("Successfully added to bookmarks"),
        queryClient.invalidateQueries({
          queryKey: ["bookmarks"]
        })
      dispatch(addToBookMarksReducer(data))
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { addToBookmarks, isAdding }
}

export default useAddToBookMarks

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile as updateProfileApi } from "../services/userApi"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { getUserId } from "../reducer/userSlice"

function useUpdateProfile() {
  const userId = useSelector(getUserId)
  const queryClient = useQueryClient()
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateProfileApi(data),
    onSuccess: () => {
      toast.success("Profile updated successfully"),
        queryClient.invalidateQueries({
          queryKey: [`user:${userId}`]
        })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  return { updateProfile, isUpdating }
}

export default useUpdateProfile

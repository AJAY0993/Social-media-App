import { useMutation } from "@tanstack/react-query"
import { resetPassword as resetPasswordApi } from "../services/authApi"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { login } from "../reducer/userSlice"

function useResetPassword() {
  const dispatch = useDispatch()
  const { mutate: resetPassword, isPending: isResettingPassword } = useMutation(
    {
      mutationFn: resetPasswordApi,
      onSuccess: (data) => {
        toast.success("Password changed successfully")
        dispatch(login(data))
      },
      onError: (err) => {
        toast.error(err.message)
      }
    }
  )
  return { resetPassword, isResettingPassword }
}

export default useResetPassword

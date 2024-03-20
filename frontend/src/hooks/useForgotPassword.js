import { useMutation } from "@tanstack/react-query"
import { forgotPassword as forgotPasswordApi } from "../services/authApi"
import toast from "react-hot-toast"

function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (message) => toast.success(message),
    onError: (err) => toast.error(err.message)
  })
  return { forgotPassword, isPending }
}

export default useForgotPassword

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../services/authApi"
import { useDispatch } from "react-redux"
import { login as loginReducer } from "../reducer/userSlice"
import toast from "react-hot-toast"

function useLogin() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (data) => loginApi(data),
    onSuccess: (user) => {
      dispatch(loginReducer(user))
      toast.success("Welcome Back")
      queryClient.invalidateQueries({
        queryKey: [`user:${user._id}`]
      })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { login, isLoggingIn }
}

export default useLogin

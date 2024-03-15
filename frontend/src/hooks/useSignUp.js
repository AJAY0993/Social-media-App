import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signUp as signUpApi } from "../services/authApi"
import { useDispatch } from "react-redux"
import { login } from "../reducer/userSlice"
import toast from "react-hot-toast"

function useSignUp() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate: signUp, isPending: isSignIngUp } = useMutation({
    mutationFn: (data) => signUpApi(data),
    onSuccess: (user) => {
      dispatch(login(user))
      toast.success("Lets Go yeah")
      queryClient.invalidateQueries({
        queryKey: [`user:${user._id}`]
      })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
  return { signUp, isSignIngUp }
}

export default useSignUp

import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import Loader from "../Loader/Loader"
import { login } from "../../reducer/userSlice"
import { useMutation } from "@tanstack/react-query"
import { fetchMyProfile } from "../../services/userApi"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const pathMap = {
  "/forgotPassword": "/forgotPassword",
  "/resetPassword": "/resetPassword",
  "/signup": "/signup"
}
function ProtectRoute({ children }) {
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { mutate } = useMutation({
    mutationFn: fetchMyProfile,
    onSuccess: (data) => {
      setLoading(false)
      dispatch(login(data))
    },
    onError: (err) => {
      toast.error(err.message)
      navigate(
        pathMap[path]
          ? path
          : path.startsWith("/resetPassword")
          ? navigate(path)
          : "/login"
      )
      setLoading(false)
    }
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  if (loading) return <Loader />

  return <> {children}</>
}

export default ProtectRoute

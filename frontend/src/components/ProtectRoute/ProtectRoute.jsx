import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

import Loader from "../Loader/Loader"
import { getIsAuthenticated, login } from "../../reducer/userSlice"
import { useMutation } from "@tanstack/react-query"
import { fetchMyProfile } from "../../services/userApi"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function ProtectRoute({ children }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { mutate, error } = useMutation({
    mutationFn: fetchMyProfile,
    onSuccess: (data) => {
      setLoading(false)
      dispatch(login(data))
    },
    onError: (err) => {
      toast.error(err.message)
      navigate("/login")
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

import { useSelector } from "react-redux"
import { getIsAuthenticated } from "./../../reducer/userSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Redirect({ children }) {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(getIsAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home")
    }
  }, [isAuthenticated, navigate])
  return children
}

export default Redirect

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function ProtectRoute({ children }) {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  console.log(isAuthenticated)
  useEffect(() => {
    !isAuthenticated && navigate("/login", { replace: true })
  })
  return <>{children}</>
}

export default ProtectRoute

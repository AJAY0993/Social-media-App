import { useSelector } from "react-redux"
import { getIsAuthenticated } from "./../../reducer/userSlice"
import { Navigate } from "react-router-dom"

function Redirect({ children }) {
  const isAuthenticated = useSelector(getIsAuthenticated)
  if (isAuthenticated) return <Navigate to="/home" replace />
  return <> {children}</>
}

export default Redirect

import axios from "axios"

export default axios.create({
  baseURL:
    import.meta.env === "production" ? "/api" : "http://localhost:3000/api/",
  withCredentials: true
})

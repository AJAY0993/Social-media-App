import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./reducer/postSlice"
import userReducer from "./reducer//userSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  }
})

export default store

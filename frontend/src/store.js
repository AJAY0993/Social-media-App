import { configureStore } from "@reduxjs/toolkit"
import peerReducer from "./reducer/peerSlice"
import userReducer from "./reducer/userSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    peer: peerReducer
  }
})

export default store

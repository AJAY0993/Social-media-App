import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  onCall: false,
  call: null
}
const peerSlice = createSlice({
  name: "peer",
  initialState,
  reducers: {
    setIsOnCall(state, action) {
      state.onCall = action.payload
    },
    setCall(state, action) {
      state.call = action.payload
    },
    acceptCall(state, action) {
      state.call = action.payload
      state.onCall = true
    },
    cutCall(state) {
      state.call = null
      state.onCall = false
    },
    reset(state) {
      state.onCall = false
      state.call = null
    }
  }
})

export const { setIsOnCall, acceptCall, cutCall, setCall, reset } =
  peerSlice.actions
export const getIsOnCall = (state) => state.peer.onCall
export const getCall = (state) => state.peer.call

export default peerSlice.reducer

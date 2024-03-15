import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  user: null,
  following: [],
  followers: [],
  status: "idle",
  onlineUsers: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.followers = state.user.followers.map(
        (follower) => follower.followerId
      )
      state.following = state.user.following.map((x) => x.followingId)
      state.isAuthenticated = true
      state.status = "idle"
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload
    },
    addFollowing(state, action) {
      state.following = [...state.following, action.payload]
    },
    removeFollowing(state, action) {
      state.following = state.following.filter(
        (followingId) => followingId !== action.payload
      )
    }
  },
  extraReducers: (builder) => {}
})

export const getIsAuthenticated = (state) => state.user.isAuthenticated
export const getUser = (state) => state.user.user
export const getUserId = (state) => state.user.user._id
export const getOnlineUsers = (state) => state.user.onlineUsers
export const getFollowing = (state) => state.user.following

export const { login, setOnlineUsers, addFollowing, removeFollowing } =
  userSlice.actions
export default userSlice.reducer

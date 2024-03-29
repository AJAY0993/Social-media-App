import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  user: null,
  following: [],
  followers: [],
  status: "idle",
  onlineUsers: [],
  bookmarks: [],
  likedPosts: [],
  messages: {}
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
      state.bookmarks = [...state.user.bookmarks]
      state.likedPosts = [...state.user.likedPosts]
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
    },
    addToBookMarks(state, action) {
      state.bookmarks = [...state.bookmarks, action.payload]
    },
    removeFromBookmarks(state, action) {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark !== action.payload
      )
    },
    updateLikedPosts(state, action) {
      state.likedPosts = action.payload
    },
    incrementMessageCount(state, action) {
      state.messages[action.payload] = ++state.messages[action.payload] || 1
    },
    clearMessageCount(state, action) {
      state.messages[action.payload] = 0
    }
  }
})

export const getIsAuthenticated = (state) => state.user.isAuthenticated
export const getUser = (state) => state.user.user
export const getUserId = (state) => state.user.user._id
export const getOnlineUsers = (state) => state.user.onlineUsers
export const getFollowing = (state) => state.user.following
export const getBookmarks = (state) => state.user.bookmarks
export const getLikedPosts = (state) => state.user.likedPosts
export const getMessageCounts = (state) => state.user.messages

export const {
  login,
  setOnlineUsers,
  addFollowing,
  removeFollowing,
  addToBookMarks,
  removeFromBookmarks,
  updateLikedPosts,
  incrementMessageCount,
  clearMessageCount
} = userSlice.actions
export default userSlice.reducer

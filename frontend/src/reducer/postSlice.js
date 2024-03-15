import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPost: null,
  posts: [],
  isLoading: false
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsStart(state, action) {
      state.isLoading = true
    },
    fetchPostsSuccess() {},
    fetchPostFailure() {},
    addPost() {},
    updatePost() {},
    deletePost() {},
    likePost() {}
  }
})

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostFailure,
  addPost,
  updatePost,
  deletePost,
  likePost
} = postSlice.actions

export default postSlice.reducer

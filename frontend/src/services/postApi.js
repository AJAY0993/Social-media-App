import axios from "../utils/axios"

export const fetchPosts = async () => {
  const res = await axios("posts")
  return res.data.data.posts
}

export const createPost = async (post) => {
  const formData = new FormData()
  for (let i in post) {
    formData.append(i, post[i])
  }
  try {
    await axios("posts", {
      method: "POST",
      data: formData
    })
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchPostComments = async (postId) => {
  try {
    const res = await axios(`posts/${postId}/comments`)
    const comments = await res.data.data.comments
    return comments
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const createComment = async ({ postId, comment }) => {
  try {
    const res = await axios(`posts/${postId}/comments`, {
      method: "POST",
      data: { comment }
    })
    const newComment = await res.data.data.comment
    return newComment
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const deletePost = async (postId) => {
  try {
    const res = await axios(`posts/${postId}`, { method: "DELETE" })
    return res
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const likePost = async (postId) => {
  const res = await axios(`posts/${postId}/like`, { method: "PATCH" })
  return res.data.data
}

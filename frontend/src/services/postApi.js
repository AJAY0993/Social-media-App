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

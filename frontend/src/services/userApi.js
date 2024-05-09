import axios from "../utils/axios"

export const fetchProfile = async (userId) => {
  try {
    const res = await axios(`users/${userId}`)
    const profile = res.data.data.profile
    return profile
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchMyProfile = async () => {
  try {
    const res = await axios(`users/myProfile`)
    const profile = res.data.data.profile
    return profile
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const fetchUsers = async () => {
  const res = await axios("users")
  return res.data.data.users
}

export const fetchUserFollowers = async (userId) => {
  const res = await axios(`users/${userId}/followers`)
  return res.data.data.followers
}

export const follow = async (userToFollow) => {
  try {
    const res = await axios(`users/follow/${userToFollow}`, {
      method: "PATCH"
    })
    return res.data.data.newFollowing
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}
export const unFollow = async (userToUnFollow) => {
  try {
    const res = await axios(`users/unFollow/${userToUnFollow}`, {
      method: "DELETE"
    })
    return res.data.data.unFollowed
  } catch (err) {
    throw new Error(err.response.data.message)
  }
}

export const updateProfile = async (data) => {
  try {
    const updataion = { ...data }

    updataion.profilePic = data.profilePic?.[0]

    const formData = new FormData()

    for (let i in data) {
      formData.append(i, updataion[i])
    }

    if (typeof data.profilePic === "string") {
      formData.delete("profilePic")
    }

    const res = await axios("users/myProfile", {
      method: "PATCH",
      data: formData
    })
    return res.data.data.profile
  } catch (err) {
    console.log(err)
    throw new Error(err.response.data.message)
  }
}

export const fetchBookmarks = async () => {
  const res = await axios("users/myProfile/bookmarks")
  return res.data.data.bookmarks
}

export const addToBookmarks = async (postId) => {
  try {
    const res = await axios(`users/myProfile/bookmarks/${postId}`, {
      method: "PATCH"
    })
    return res.data.data.bookmark
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
export const removeFromBookmarks = async (postId) => {
  try {
    await axios(`users/myProfile/bookmarks/${postId}`, {
      method: "DELETE"
    })
    return postId
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

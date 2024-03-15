import axios from "../utils/axios"

export const fetchProfile = async (userId) => {
  const res = await axios(`users/${userId}`)
  const profile = res.data.data.profile
  return profile
}

export const fetchMyProfile = async () => {
  const res = await axios(`users/myProfile`)
  const profile = res.data.data.profile
  return profile
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

export async function loader({ userId }) {
  const res = await axios(`users/${userId}`)
  return res.data.data.profile
}

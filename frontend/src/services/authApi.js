import axios from "../utils/axios"

export async function login({ email, password }) {
  try {
    const res = await axios("users/login", {
      method: "POST",
      data: {
        email,
        password
      }
    })
    const user = res.data.data.user
    return user
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export async function signUp(data) {
  try {
    const res = await axios("users/signUp", {
      data,
      method: "POST"
    })
    const user = res.data.data.user
    return user
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

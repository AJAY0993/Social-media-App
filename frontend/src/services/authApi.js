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

export const forgotPassword = async (email) => {
  try {
    const res = await axios("/users/forgotPassword", {
      method: "POST",
      data: {
        email
      }
    })
    const message = res.data.message
    return message
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const resetPassword = async (data) => {
  try {
    const res = await axios(`users/resetPassword/${data.resetPasswordToken}`, {
      method: "POST",
      data: {
        password: data.password,
        confirmPassword: data.confirmPassword
      }
    })
    const user = res.data.data.user
    return user
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

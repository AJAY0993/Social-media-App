import isValidEmail from "./isValidEmail"

const validators = {
  email: {
    required: "This field is required",
    validate: (value) => isValidEmail(value) || "Please provide a valid email"
  },
  username: {
    required: "Please provide your username",
    minLength: {
      value: 3,
      message: "Username must be 3 characters long"
    },
    maxLength: {
      value: 20,
      message: "Username should not be longer than 20 characters"
    }
  },
  password: {
    required: "Please provide your password",
    minLength: {
      value: 8,
      message: "Password must be 8 characters long"
    },
    maxLength: {
      value: 20,
      message: "Password should not be longer than 20 characters"
    }
  },
  confirmPassword: {
    required: "Please confirm your password"
  }
}

export default validators

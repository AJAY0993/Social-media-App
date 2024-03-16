import { Link, redirect } from "react-router-dom"
import styles from "./Signup.module.css"
import isValidEmail from "../../utils/isValidEmail"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import axios from "../../utils/axios"
import store from "../../store"
import { login } from "../../reducer/userSlice"
import useBack from "../../hooks/useBack"
import { useForm } from "react-hook-form"
import useSignUp from "../../hooks/useSignUp"

function Signup() {
  const { register, formState, handleSubmit, getValues } = useForm()
  const { errors } = formState
  const { signUp, isSignIngUp } = useSignUp()
  const back = useBack()

  return (
    <section>
      <div className="container">
        <div>
          <button
            className={"btn btn__primary btn--square " + styles["btn--back"]}
            onClick={back}
          >
            {" "}
            <img src="/images/icons/back.png" />
          </button>
          <div className={styles.signup__container}>
            <div className={styles.img__container}>
              <img src="images/post-portrait.png" alt="phone" />
              <img
                src="images/post-portrait-2.png"
                alt="phone"
                className={styles.post__bg}
              />
            </div>
            <div>
              <h1 className={styles.signup__heading}>Let's connect</h1>
              <p className={styles.signup__text}>Create your account</p>
              <form className="login__form" onSubmit={handleSubmit(signUp)}>
                <div>
                  <input
                    type="text"
                    className="inp inp__secondary"
                    placeholder="Enter your username"
                    {...register("username", {
                      required: "Please provide your username",
                      minLength: {
                        value: 3,
                        message: "Username must be 3 characters long"
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Username should not be longer than 20 characters"
                      }
                    })}
                  />
                  {errors?.username && (
                    <ErrorMessage message={errors.username.message} />
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    className="inp inp__secondary"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Please provide your email",
                      validate: (value) =>
                        isValidEmail(value) || "Please provide a valid email"
                    })}
                  />
                  {errors?.email && (
                    <ErrorMessage message={errors.email.message} />
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    className="inp inp__secondary"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Please provide your password",
                      minLength: {
                        value: 8,
                        message: "Password must be 8 characters long"
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Password should not be longer than 20 characters"
                      }
                    })}
                  />
                  {errors?.password && (
                    <ErrorMessage message={errors.password.message} />
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    className="inp inp__secondary"
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match"
                    })}
                  />
                  {errors?.confirmPassword && (
                    <ErrorMessage message={errors.confirmPassword.message} />
                  )}
                </div>

                <button className="btn btn__primary" disabled={isSignIngUp}>
                  {isSignIngUp ? "Signing up" : "Sign up"}
                </button>
              </form>
              <div>
                <span className={styles.line}>---------------</span>
                <span>or with</span>
                <span className={styles.line}>---------------</span>
                <p className={styles.signup__text}>
                  Already have an account?{" "}
                  <Link className={styles.link} to="/login">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const formErrors = {}
  const username = formData.get("username")
  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirm-password")
  console.log(confirmPassword, password)
  if (username.length < 3)
    formErrors.username = "username must be longer than 2 chracters"
  if (!isValidEmail(email)) formErrors.email = "Please provide a valid email"
  if (password.length < 8)
    formErrors.password = "Password must be 8 characters long"
  if (password !== confirmPassword)
    formErrors.confirmPassword = "Passwords do not match"

  if (
    formErrors.username ||
    formErrors.email ||
    formErrors.password ||
    formErrors.confirmPassword
  ) {
    return formErrors
  }
  try {
    const res = await axios("users/signUp", {
      data: {
        username,
        email,
        password,
        confirmPassword
      },
      method: "POST"
    })
    const user = res.data.data.user
    store.dispatch(login(user))
    return redirect("/home")
  } catch (error) {
    alert(error.response.data.message)
    return null
  }
}
export default Signup

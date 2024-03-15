import { Link, redirect } from "react-router-dom"
import store from "../../store"
import { login } from "../../reducer/userSlice"
import isValidEmail from "../../utils/isValidEmail"
import styles from "./Login.module.css"
import axios from "axios"
import useBack from "../../hooks/useBack"
import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import useLogin from "../../hooks/useLogin"
import Button from "../../components/Button/Button"

function Login() {
  const { login, isLoggingIn } = useLogin()
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState
  const back = useBack()

  return (
    <section className="login">
      <div className="container">
        <div>
          <button
            className={"btn btn__primary btn--square " + styles["btn--back"]}
            onClick={back}
          >
            {" "}
            <img src="/images/icons/back.png" />
          </button>
          <div className={styles.login__container}>
            <div className={styles.img__container}>
              <img src="images/post-portrait.png" alt="phone" />
              <img
                src="images/post-portrait-2.png"
                alt="phone"
                className={styles.post__bg}
              />
            </div>
            <div>
              <h1 className={styles.login__heading}>Hello Again!</h1>
              <p className={styles.login__text}>Sign in to your account</p>
              <form
                method="POST"
                className="login__form"
                onSubmit={handleSubmit(login)}
              >
                <div>
                  <input
                    type="email"
                    className="inp inp__secondary"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "This field is required",
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
                    type="text"
                    className="inp inp__secondary"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Please provide this field",
                      minLength: {
                        value: 8,
                        message: "Password must be 8 characters long"
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Password should not be larger than 20 characters"
                      }
                    })}
                  />
                  {errors?.password && (
                    <ErrorMessage message={errors.password.message} />
                  )}
                </div>
                <Link className={styles.link} to="/forgotPassword">
                  Forgot password ?
                </Link>
                <Button type="primary">Sign in</Button>
              </form>
              <div>
                <span className={styles.line}>---------------</span>
                <span>or with</span>
                <span className={styles.line}>---------------</span>

                <button className="btn btn__secondary" disabled={true}>
                  <img src="images/icons/google.png" alt="google" /> Continue
                  with google
                </button>
                <button className="btn btn__secondary">
                  <img src="images/icons/twitter.png" alt="google" />
                  Continue with twitter
                </button>
                <p className={styles.login__text}>
                  Dont have an account?{" "}
                  <Link className={styles.link} to="/register">
                    Sign up
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
  const email = formData.get("email")
  const password = formData.get("password")
  const error = {}
  if (!isValidEmail(email)) error.email = "Please provide a valid email"
  if (password.length < 8) error.password = "Password must be 8 chracter long"

  if (error.email || error.password) return error

  const configurations = {
    method: "POST",
    url: `http://localhost:3000/api/users/login`,
    withCredentials: true,
    data: {
      email,
      password
    }
  }
  try {
    const res = await axios(configurations)
    const user = res.data.data.user
    store.dispatch(login(user))
    return redirect("/home")
  } catch (error) {
    alert(error.response.data.message)
  }
  return null
}

export default Login

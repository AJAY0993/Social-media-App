import { useForm } from "react-hook-form"
import styles from "./ForgotPassword.module.css"
import validators from "./../../utils/validators"
import useForgotPassword from "../../hooks/useForgotPassword"
import Button from "../../components/Button/Button"
import { FaSpinner } from "react-icons/fa6"

function ForgotPassword() {
  const { register, handleSubmit } = useForm()
  const { forgotPassword, isPending } = useForgotPassword()
  const onSubmit = (data) => {
    forgotPassword(data.email)
  }
  return (
    <section className="container">
      <div className="container">
        <div>
          <button
            className={"btn btn__primary btn--square " + styles["btn--back"]}
          >
            <img src="/images/icons/back.png" />
          </button>
          <div className={styles.forgotPassword__container}>
            <div className={styles.img__container}>
              <img src="images/post-portrait.png" alt="phone" />
              <img
                src="images/post-portrait-2.png"
                alt="phone"
                className={styles.post__bg}
              />
            </div>
            <div>
              <h1 className={styles.forgotPassword__heading}>
                Forgot your password?
              </h1>
              <p className={styles.forgotPassword__text}>
                No problem! an email with instructions to reset your password
                will be send to your email
              </p>
              <form
                className="forgotPassword__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="email"
                  className="inp inp__secondary"
                  placeholder="Enter your email"
                  {...register("email", validators.email)}
                />
                <Button type="primary" disabled={isPending}>
                  {isPending ? <FaSpinner /> : "Send"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword

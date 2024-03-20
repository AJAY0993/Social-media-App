import { useForm } from "react-hook-form"
import validators from "../../utils/validators"
// import useResetPassword from "../../hooks/useResetPassword"
import Button from "../../components/Button/Button"
import { FaSpinner } from "react-icons/fa6"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import styles from "./ResetPassword.module.css"
import useResetPassword from "../../hooks/useResetPassword"
import { useParams } from "react-router-dom"

function ResetPassword() {
  const { resetPasswordToken } = useParams()
  const { register, handleSubmit, formState, getValues } = useForm()
  const { resetPassword, isResettingPassword } = useResetPassword()
  const { errors } = formState
  const onSubmit = (data) => {
    resetPassword({ ...data, resetPasswordToken })
  }
  return (
    <section className="container">
      <div>
        <button
          className={"btn btn__primary btn--square " + styles["btn--back"]}
        >
          <img src="/images/icons/back.png" />
        </button>
        <div>
          <div className="flex col j-center a-center g1 text-center">
            <h1 className="text-center">Please enter your new password</h1>
            <p className="text-center" style={{ width: "33ch" }}>
              No problem! an email with instructions to reset your password will
              be send to your email
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="password"
                  className="inp inp__secondary"
                  placeholder="Enter your password"
                  {...register("password", validators.password)}
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
              <Button type="primary" disabled={isResettingPassword}>
                {isResettingPassword ? <FaSpinner /> : "Save"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ResetPassword

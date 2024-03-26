import { useForm } from "react-hook-form"
import styles from "./UpdateProfile.module.css"
import Button from "../Button/Button"
import { useSelector } from "react-redux"
import { getUser } from "../../reducer/userSlice"
import validators from "./../../utils/validators"
import useUpdateProfile from "../../hooks/useUpdateProfile"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

function UpdateProfile({ close }) {
  const user = useSelector(getUser)
  const { updateProfile, isUpdating } = useUpdateProfile()
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: user.email,
      username: user.username,
      bio: user.bio || "",
      profilePic: user.profilePic
    }
  })
  const { errors } = formState

  const onSubmit = (data) => {
    updateProfile(data, {
      onSuccess: close
    })
  }

  return (
    <div>
      <div className={styles.profilePic}>
        <img />
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className={styles.formRow}>
          <label htmlFor="username">Username:</label>
          <input
            className="inp"
            id="username"
            {...register("username", validators.username)}
          />
          {errors?.username && (
            <ErrorMessage message={errors.username.message} />
          )}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="email">Email:</label>
          <input className="inp" {...register("email", validators.email)} />
          {errors?.email && <ErrorMessage message={errors.email.message} />}
        </div>

        <div className={styles.formRow}>
          <label>Bio</label>
          <textarea className="textarea" {...register("bio")} />
        </div>

        <div className={styles.formRow}>
          <label>Profile Pic</label>
          <input className="" type="file" {...register("profilePic")} />
        </div>

        <Button type="primary" disable={isUpdating}>
          Save
        </Button>
      </form>
    </div>
  )
}

export default UpdateProfile

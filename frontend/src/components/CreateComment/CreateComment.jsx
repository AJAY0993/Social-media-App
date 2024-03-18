import useCreateComment from "../../hooks/useCreateComment"
import { useForm } from "react-hook-form"
import Button from "../Button/Button"
import styles from "./CreateComment.module.css"

function CreateComment({ postId, close }) {
  const { createComment, isCreating } = useCreateComment()
  const { handleSubmit, register, getValues } = useForm()

  const onSubmit = (data) => {
    createComment({ ...data, postId }, { onSuccess: close })
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form}  flex row`}
      >
        <input
          className={`${styles.input}`}
          placeholder="Add comment"
          {...register("comment", { required: "Comment must not be empty" })}
        />
        <div className={styles.buttonWrapper}>
          <Button
            type="primary"
            disabled={isCreating || getValues("comment") === ""}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  )
}
export default CreateComment

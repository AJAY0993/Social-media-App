import useCreateComment from "../../hooks/useCreateComment"
import { useForm } from "react-hook-form"
import { IoMdSend } from "react-icons/io"
import styles from "./CreateComment.module.css"

function CreateComment({ postId, close }) {
  const { createComment, isCreating } = useCreateComment()
  const { handleSubmit, register, getValues } = useForm()

  const onSubmit = (data) => {
    createComment(data, { onSuccess: close })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input
          className={`${styles.input}`}
          placeholder="Add comment"
          {...register("comment", { required: "Comment must not be empty" })}
        />
        <input type="hidden" value={postId} {...register("postId")} />
        <button
          className={styles.sendButton}
          disabled={isCreating || getValues("comment") === ""}
        >
          <IoMdSend />
        </button>
      </div>
    </form>
  )
}
export default CreateComment
{
  /* <div className={styles.buttonWrapper}>
        <button disabled={isCreating || getValues("comment") === ""}>
          <IoSend />
        </button>
      </div> */
}

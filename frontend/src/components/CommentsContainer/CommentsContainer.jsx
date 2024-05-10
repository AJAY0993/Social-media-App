import Comment from "../Comment/Comment"
import CreateComment from "../CreateComment/CreateComment"
import styles from "./CommentsContainer.module.css"

function CommentsContainer({ comments, postId, isLoading }) {
  if (isLoading) return "loading comments"

  return (
    <div className={styles.commentsContainer}>
      <CreateComment postId={postId} />
      <ul className={styles.commentsList}>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </ul>
    </div>
  )
}

export default CommentsContainer

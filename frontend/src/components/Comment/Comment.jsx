import { formatDate } from "../../utils/helpers"
import styles from "./Comment.module.css"

function Comment({ comment }) {
  return (
    <>
      <div className={`${styles.comment} flex g-1`}>
        <img src={comment.creator.profilePic} />{" "}
        <div className={`${styles.col2} flex col`}>
          <div className={`${styles.user} flex  g-1 `}>
            <span className={styles.username}>{comment.creator.username}</span>
            <span className={styles.timeSpan}>
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="">{comment.comment}</p>
        </div>
      </div>
    </>
  )
}

export default Comment

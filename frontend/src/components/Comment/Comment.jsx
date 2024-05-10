import { formatDate } from "../../utils/helpers"
import styles from "./Comment.module.css"

function Comment({ comment }) {
  return (
    <>
      <li className={`${styles.commentContainer}`}>
        <img
          className={styles.commentImage}
          src={comment.creator.profilePic}
          alt="profilePic"
        />
        <div className={styles.commentText + " flex col"}>
          <div className={` flex a-center  g-1 `}>
            <span className={styles.commentName}>
              {comment.creator.username}
            </span>

            <span className={styles.commentTime}>
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className={styles.commentBody}>{comment.comment}</p>
        </div>
      </li>
    </>
  )
}

export default Comment

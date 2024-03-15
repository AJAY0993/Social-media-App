import User from "../User/User"
import styles from "./Comment.module.css"

const comments = [
  "YouTube Comment Picker is a free tool to choose a random winner from the comments on a YouTube video for your YouTube giveaways, promotio",
  "YouTube Comment Picker is a free tool to choose a random winner from the comments on a YouTube video for your YouTube giveaways, promotio",
  "YouTube Comment Picker is a free tool to choose a random winner from the comments on a YouTube video for your YouTube giveaways, promotio"
]
function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <User customClass={styles.user} />
      <p className="p1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptas
        quae omnis qui eligendi debitis quo, consequatur sequi, tempore est,
        labore iure unde explicabo dolores perferendis. Itaque nisi provident
        nam!
        <span> </span>
      </p>
    </div>
  )
}

export default Comment

import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

import { IoHeartOutline, IoShareSocialOutline } from "react-icons/io5"
import { FaRegComments } from "react-icons/fa6"
import { RiBookMarkLine } from "react-icons/ri"
import User from "../User/User"
import { formatDate } from "../../utils/helpers"
import styles from "./Post.module.css"

Post.propTypes = {
  post: PropTypes.objectj
}
function Post({ post, customClass }) {
  const navigate = useNavigate()
  const user = {
    username: "username"
  }
  return (
    <div>
      <article className={styles.post}>
        <div className={styles.user__wrapper}>
          <User
            onClick={() => navigate(`/profile/${post.userId}`)}
            user={user}
            secondaryCaption={formatDate(post.createdAt)}
            showBtn={false}
            customClass={styles.user}
          />
        </div>
        <div className={styles.post__container}>
          <img
            className={styles.post__img}
            src={
              post.imageUrl ||
              "https://source.unsplash.com/random/400x400?sig=3"
            }
          />

          <div className={styles.post__text}>
            <h4>{post.caption}</h4>
            <p>{post.content}</p>
          </div>
          <div className={styles.controller}>
            <IoHeartOutline fontSize={"2rem"} />
            <IoShareSocialOutline fontSize={"2rem"} />
            <FaRegComments fontSize={"2rem"} />
            <RiBookMarkLine fontSize={"2rem"} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default Post

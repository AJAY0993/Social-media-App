import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

import { IoHeartOutline, IoShareSocialOutline } from "react-icons/io5"
import { FaRegComments, FaSpinner } from "react-icons/fa6"
import { RiBookMarkLine, RiBookMarkFill } from "react-icons/ri"
import { FcLike } from "react-icons/fc"
import User from "../User/User"
import { formatDate } from "../../utils/helpers"
import styles from "./Post.module.css"
import { useState } from "react"
import Modal from "../Modal/Modal"
import List from "./../List/List"
import Comment from "./../Comment/Comment"
import CreateComment from "../CreateComment/CreateComment"
import useComments from "../../hooks/useComments"
import useAddToBookMarks from "../../hooks/useAddToBookmarks"
import useRemoveFromBookmarks from "./../../hooks/useRemoveFromBookmarks"
import { useSelector } from "react-redux"
import { getBookmarks, getLikedPosts } from "../../reducer/userSlice"
import Loader from "./../Loader/Loader"
import useLike from "../../hooks/useLike"

Post.propTypes = {
  post: PropTypes.object
}
function Post({ post }) {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const bookmarks = useSelector(getBookmarks)
  const likedPosts = useSelector(getLikedPosts)
  const { addToBookmarks, isAdding } = useAddToBookMarks()
  const { removeFromBookmarks, isRemoving } = useRemoveFromBookmarks()
  const { like, isLiking } = useLike()
  const { comments, isLoading } = useComments(post._id)
  const handleBookMarking = () => {
    if (isRemoving || isAdding) return <FaSpinner />
    if (bookmarks.includes(post._id))
      return <RiBookMarkFill onClick={() => removeFromBookmarks(post._id)} />
    if (!bookmarks.includes(post._id))
      return <RiBookMarkLine onClick={() => addToBookmarks(post._id)} />
  }
  const handleLiking = () => {
    if (isLiking) return <FaSpinner />
    if (likedPosts.includes(post._id))
      return <FcLike onClick={() => like(post._id)} />
    return <IoHeartOutline onClick={() => like(post._id)} />
  }

  const onClose = () => setShowModal(false)
  return (
    <div>
      <article className={styles.post}>
        <div className={styles.user__wrapper}>
          <User
            onClick={() => navigate(`/profile/${post.user}`)}
            user={post.originalCreator}
            secondaryCaption={formatDate(post.createdAt)}
            showBtn={false}
            customClass={styles.user}
          />
        </div>
        <div className={styles.post__container}>
          {post.imageUrl && (
            <img className={styles.post__img} src={post.imageUrl} />
          )}

          <div className={styles.post__text}>
            <h4>{post.caption}</h4>
            <p>{post.content}</p>
          </div>
          <div className={styles.controller}>
            {handleLiking()}
            <IoShareSocialOutline />
            <FaRegComments onClick={() => setShowModal(true)} />
            {handleBookMarking()}
            {showModal && (
              <Modal onClose={onClose}>
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    <CreateComment postId={post._id} close={onClose} />
                    <List
                      items={comments}
                      render={(comment) => (
                        <Comment comment={comment} key={comment._id} />
                      )}
                      title={"Comments"}
                      failureMessage={"No comments yet"}
                    ></List>
                  </>
                )}
              </Modal>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default Post

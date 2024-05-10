import { useState } from "react"
import PropTypes from "prop-types"

import { IoHeartOutline, IoShareSocialOutline } from "react-icons/io5"
import { FaRegComments, FaSpinner } from "react-icons/fa6"
import {
  RiBookMarkLine,
  RiBookMarkFill,
  RiDeleteBin3Fill,
  RiShareForwardFill
} from "react-icons/ri"
import { FcLike } from "react-icons/fc"
import User from "../User/User"
import styles from "./Post.module.css"
import useComments from "../../hooks/useComments"
import useAddToBookMarks from "../../hooks/useAddToBookmarks"
import useRemoveFromBookmarks from "./../../hooks/useRemoveFromBookmarks"
import { useSelector } from "react-redux"
import useLike from "../../hooks/useLike"
import Dropdown from "../Dropdown/Dropdown"
import { getBookmarks, getLikedPosts, getUserId } from "../../reducer/userSlice"
import { formatDate } from "../../utils/helpers"
import usePostDelete from "../../hooks/usePostDelete"
import CommentsContainer from "../CommentsContainer/CommentsContainer"

Post.propTypes = {
  post: PropTypes.object
}

function Post({ post }) {
  const [showComments, setShowComments] = useState(false)

  const bookmarks = useSelector(getBookmarks)
  const likedPosts = useSelector(getLikedPosts)
  const userId = useSelector(getUserId)

  const { addToBookmarks, isAdding } = useAddToBookMarks()
  const { removeFromBookmarks, isRemoving } = useRemoveFromBookmarks()
  const { like, isLiking } = useLike()
  const { comments, isLoading } = useComments(post._id)
  const { deletePost } = usePostDelete()
  const user = { ...post.originalCreator, _id: post.user }

  const handleBookMarking = () => {
    if (isRemoving || isAdding) return <FaSpinner />
    if (bookmarks.includes(post._id))
      return <RiBookMarkFill onClick={() => removeFromBookmarks(post._id)} />
    if (!bookmarks.includes(post._id))
      return <RiBookMarkLine onClick={() => addToBookmarks(post._id)} />
  }
  const handleLiking = () => {
    if (isLiking) return <FaSpinner className={styles.like} />
    if (likedPosts.includes(post._id))
      return <FcLike onClick={() => like(post._id)} />
    return <IoHeartOutline onClick={() => like(post._id)} />
  }
  const handleDeletePost = () =>
    deletePost(post._id, {
      onSuccess: () => {
        const postElement = document.querySelector(
          '[data-id="' + post._id + '"]'
        )
        postElement.remove()
      }
    })

  return (
    <div data-id={post._id}>
      <article className={styles.post}>
        <div className={styles.user__wrapper}>
          <User
            user={user}
            secondaryCaption={formatDate(post.createdAt)}
            showBtn={false}
            customClass={styles.user}
          >
            <div className="relative">
              <Dropdown.Toggle id={post._id} />
              <Dropdown.List id={post._id} top="1.5rem" right=".8rem">
                {post.user === userId && (
                  <Dropdown.Item onClick={handleDeletePost}>
                    <RiDeleteBin3Fill />
                    <span>Delete</span>
                  </Dropdown.Item>
                )}
                <Dropdown.Item>
                  <RiShareForwardFill />
                  <span>Share</span>
                </Dropdown.Item>
              </Dropdown.List>
            </div>
          </User>
        </div>
        <div className={styles.post__container}>
          {post.imageUrl && (
            <img className={styles.postImg} src={post.imageUrl} />
          )}

          <div className={styles.postText}>
            <h4>{post.caption}</h4>
            <p>{post.content}</p>
          </div>
          <div className={styles.controller}>
            {handleLiking()}
            <IoShareSocialOutline />
            <FaRegComments onClick={() => setShowComments((s) => !s)} />
            {handleBookMarking()}
          </div>
          {showComments && (
            <CommentsContainer
              comments={comments}
              postId={post._id}
              isLoading={isLoading}
            />
          )}
        </div>
      </article>
    </div>
  )
}

export default Post

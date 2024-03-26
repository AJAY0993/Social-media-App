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
import Modal from "../Modal/Modal"
import List from "./../List/List"
import Comment from "./../Comment/Comment"
import CreateComment from "../CreateComment/CreateComment"
import useComments from "../../hooks/useComments"
import useAddToBookMarks from "../../hooks/useAddToBookmarks"
import useRemoveFromBookmarks from "./../../hooks/useRemoveFromBookmarks"
import { useSelector } from "react-redux"
import Loader from "./../Loader/Loader"
import useLike from "../../hooks/useLike"
import Dropdown from "../Dropdown/Dropdown"
import { getBookmarks, getLikedPosts, getUserId } from "../../reducer/userSlice"
import { formatDate } from "../../utils/helpers"
import { useState } from "react"
import usePostDelete from "../../hooks/usePostDelete"

Post.propTypes = {
  post: PropTypes.object
}

function Post({ post }) {
  const [showModal, setShowModal] = useState(false)

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
  const handleDeletePost = () => deletePost(post._id)

  const onClose = () => setShowModal(false)
  return (
    <div>
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
            <FaRegComments onClick={() => setShowModal(true)} />
            {handleBookMarking()}
            {showModal && (
              <Modal onClose={onClose}>
                {isLoading ? (
                  "Loading..."
                ) : (
                  <div className="px-1">
                    <CreateComment postId={post._id} close={onClose} />
                    <List
                      items={comments}
                      render={(comment) => (
                        <Comment comment={comment} key={comment._id} />
                      )}
                      title={"Comments"}
                      failureMessage={"No comments yet"}
                    ></List>
                  </div>
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

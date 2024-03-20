import { useState } from "react"
import styles from "./User.module.css"
import PropTypes from "prop-types"
import Modal from "../Modal/Modal"
import { useNavigate } from "react-router-dom"

User.propTypes = {
  user: PropTypes.object,
  secondaryCaption: PropTypes.string,
  customClass: PropTypes.string
}

function User({
  user = { username: "username", email: "Email" },
  secondaryCaption = "@rdj",
  children,
  customClass
}) {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const handleClose = () => setShowModal(false)
  const handleClick = () => navigate(user._id)
  return (
    <>
      <article className={styles.user + " " + customClass}>
        <figure className={styles.figure} onClick={handleClick}>
          <img
            className="btn--circle"
            src={
              user.profilePic ||
              "https://randomuser.me/api/portraits/men/99.jpg"
            }
            alt="profile-pic"
            onClick={(e) => {
              e.stopPropagation()
              setShowModal(true)
            }}
          />
          <figcaption>
            <h4>{user.username}</h4>
            <span>{secondaryCaption}</span>
          </figcaption>
        </figure>
        <div className={styles.btn__wrapper}>{children}</div>
      </article>
      {showModal && (
        <Modal onClose={handleClose}>
          <div>
            <img
              src={
                user.profilePic ||
                "https://randomuser.me/api/portraits/men/99.jpg"
              }
              alt="profile-pic"
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default User

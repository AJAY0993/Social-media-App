import { useState } from "react"
import styles from "./User.module.css"
import PropTypes from "prop-types"
import Modal from "../Modal/Modal"

User.propTypes = {
  user: PropTypes.object,
  secondaryCaption: PropTypes.string,
  onClick: PropTypes.func,
  customClass: PropTypes.string
}

function User({
  user = { username: "username", email: "Email" },
  secondaryCaption = "@rdj",
  onClick,
  children,
  customClass
}) {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  return (
    <>
      <article className={styles.user + " " + customClass}>
        <figure className={styles.figure} onClick={onClick}>
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

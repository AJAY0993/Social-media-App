import Button from "../Button/Button"
import styles from "./User.module.css"
import PropTypes from "prop-types"

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
            alt="profile-user"
            border="0"
          />
          <figcaption>
            <h4>{user.username}</h4>
            <span>{secondaryCaption}</span>
          </figcaption>
        </figure>
        <div className={styles.btn__wrapper}>{children}</div>
      </article>
    </>
  )
}

export default User
